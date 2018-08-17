import React, { Component } from 'react'
import { scaleQuantile } from 'd3-scale'
import { rgb } from 'd3-color'
import { easeCubic } from 'd3-ease'
import rbush from 'rbush'
import DeckGL, { WebMercatorViewport, IconLayer, PathLayer, GeoJsonLayer, TextLayer, ArcLayer } from 'deck.gl'
const Arc = require('arc')
import TagmapLayer from './tagmap-layer';
import { properties, RGBAtoArray } from '../../../properties'

const iconMapping = {
  'marker-1': {
    'x': 0,
    'y': 0,
    'width': 126,
    'height': 117,
    'anchorY': 117
  },
  'marker-2': {
    'x': 126,
    'y': 0,
    'width': 126,
    'height': 117,
    'anchorY': 117
  },
  'marker-3': {
    'x': 252,
    'y': 0,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-4': {
    'x': 378,
    'y': 0,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-5': {
    'x': 0,
    'y': 117,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-6': {
    'x': 126,
    'y': 117,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-7': {
    'x': 252,
    'y': 117,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-8': {
    'x': 378,
    'y': 117,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-9': {
    'x': 0,
    'y': 234,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-10': {
    'x': 126,
    'y': 234,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-20': {
    'x': 252,
    'y': 234,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-30': {
    'x': 378,
    'y': 234,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-40': {
    'x': 0,
    'y': 384,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-50': {
    'x': 126,
    'y': 384,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-60': {
    'x': 252,
    'y': 384,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-70': {
    'x': 378,
    'y': 384,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-80': {
    'x': 0,
    'y': 512,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-90': {
    'x': 126,
    'y': 512,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker-100': {
    'x': 252,
    'y': 512,
    'width': 126,
    'height': 117,
    'anchorY': 146
  },
  'marker': {
    'x': 378,
    'y': 512,
    'width': 126,
    'height': 117,
    'anchorY': 146
  }
}
const fullTime = 4000
let interval = -1

export const inFlowColors = [
  [255, 255, 204],
  [199, 233, 180],
  [127, 205, 187],
  [65, 182, 196],
  [29, 145, 192],
  [34, 94, 168],
  [12, 44, 132]
]

export const outFlowColors = [
  [255, 255, 178],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [177, 0, 38]
]

function getIconName (size) {
  if (size === 0) {
    return ''
  }
  if (size < 10) {
    return `marker-${size}`
  }
  if (size < 100) {
    return `marker-${Math.floor(size / 10)}0`
  }
  return 'marker-100'
}

function getIconSize (size) {
  return Math.min(100, size) / 100 * 0.5 + 0.5
}

function colorToRGBArray (color) {
  if (Array.isArray(color)) {
    return color.slice(0, 4)
  }

  const c = rgb(color)
  return [c.r, c.g, c.b, 255]
}

export default class DeckGLOverlay extends Component {
  static get defaultViewport () {
    return {
      longitude: -100,
      latitude: 40.7,
      zoom: 3,
      maxZoom: 15,
      pitch: 30,
      bearing: 30
    }
  }

  constructor (props) {
    super(props)
    this._tree = rbush(9, ['.x', '.y', '.x', '.y'])
    this.state = {
      animatedFeature: [],
      arcs: this._getArcs(props.arcData),
      marker: [],
      texts: [],
      // geo: props.geoData || [],
      x: 0,
      y: 0,
      hoveredItems: null
    }
  }

  componentWillUnmount () {
    if (interval !== -1) {
      clearInterval(interval)
      interval = -1
      this.props.updateLine([])
      // this.setState({ animatedFeature: [] })
    }
  }

  componentDidMount () {
    const { markerData, viewport, sizeScale, showCluster } = this.props
    this._getMarker( {...{markerData: markerData}, sizeScale, viewport, showCluster}) // .filter(el => el.subtype !== 'cities')
    this._getTexts( {...{markerData: markerData.filter(el => el.subtype === 'cities')}, viewport, showCluster})
  }

  componentWillReceiveProps (nextProps) {
    const { contentIndex, markerData, arcData, geoData, updateLine } = this.props

    const { showCluster, sizeScale } = nextProps
    if (
      nextProps.arcData !== arcData || !nextProps.arcData.every((el, i) => el === arcData[i])
    ) {
      this.setState({
        arcs: this._getArcs(nextProps.arcData)
      })
    }

    const { viewport } = nextProps
    const oldViewport = this.props.viewport

    if (this.props.showCluster !== showCluster ||
      nextProps.markerData.length !== markerData.length ||
      viewport.width !== oldViewport.width ||
      viewport.height !== oldViewport.height) {


      const nextIconMarker = nextProps.markerData/*.filter(el => el.subtype !== 'cities')*/
      const nextTextMarker = nextProps.markerData.filter(el => el.subtype === 'cities')
      const iconMarker = markerData/*.filter(el => el.subtype !== 'cities')*/
      const textMarker = markerData.filter(el => el.subtype === 'cities')

      if (this.props.showCluster !== showCluster || nextIconMarker.length !== iconMarker.length) {
        this.setState({ marker: this._getMarker({ ...{markerData: nextIconMarker}, sizeScale, viewport, showCluster}) })
      }
      if (nextTextMarker.length !== textMarker.length) {
        this.setState({ texts: this._getTexts({ ...{markerData: nextTextMarker}, viewport}) })
      }
    }

    if (interval !== -1 && (nextProps.geoData || []).length === 0) {
      clearInterval(interval)
      interval = -1
      // this.setState({ animatedFeature: [] })
      this.props.updateLine([])
    }
    if (nextProps.contentIndex !== contentIndex) {
      if (interval !== -1) {
        clearInterval(interval)
        interval = -1
        // this.setState({ animatedFeature: [] })
        this.props.updateLine([])
      }

      // animate if currentIndex has feature
      let selectedFeature = geoData.filter(f => f.index === nextProps.contentIndex)[0]
      if (selectedFeature) {
        let step = 0
        let lineToAnimate

        if (selectedFeature.connect !== true && (selectedFeature.geometry.coordinates || []).length === 2) {
          let prevCoords
          for (let i = +nextProps.contentIndex - 1; i > -1; i--) {
            const currCoords = ((geoData[i] || {}).geometry || {}).coordinates || []
            if (currCoords.length === 2) {
              prevCoords = currCoords
              break
            }
          }
          if (!prevCoords) return
          const end = { x: selectedFeature.geometry.coordinates[0], y: selectedFeature.geometry.coordinates[1] }
          const start = { x: prevCoords[0], y: prevCoords[1] }
          const generator = new Arc.GreatCircle(start, end, {})
          lineToAnimate = generator.Arc(100, { offset:10 }).geometries[0].coords
        } else {
          lineToAnimate = (((selectedFeature.properties || {}).f || {}).geometry || {}).coordinates
          if (!lineToAnimate) return
        }

        const numSteps = lineToAnimate.length // Change this to set animation resolution
        let prevIndex = -1

        const self = this
        if (interval !== -1) {
          clearInterval(interval)
          interval = -1
        }
        interval = setInterval(function () {
          step += 1
          if (step > numSteps) {
            clearInterval(interval)
            interval = -1
          } else {
            let curDistance = step / numSteps
            let nextIndex = Math.floor(easeCubic(curDistance) * numSteps)
            if (nextIndex === numSteps) {
              clearInterval(interval)
              interval = -1
              return
            }
            if (nextIndex !== prevIndex) {
              updateLine(lineToAnimate.slice(0, nextIndex))
            }
            prevIndex = nextIndex
          }
        }, fullTime / numSteps)
      }
    }
  }

  _getTexts ({ markerData, viewport }) {
    if (!markerData) {
      return false
    }

    const transform = new WebMercatorViewport({
      ...viewport,
      zoom: 0
    })

    markerData.forEach(p => {
      const screenCoords = transform.project(p.coo)
      p.x = screenCoords[0]
      p.y = screenCoords[1]
      p.zoomLevels = []
    })

    return markerData
  }

  _getMarker ({ markerData, viewport, showCluster }) {
    if (!markerData) {
      return false
    }

    const tree = this._tree

    const transform = new WebMercatorViewport({
      ...viewport,
      zoom: 0
    })

    markerData.forEach(p => {
      const screenCoords = transform.project(p.coo)
      p.x = screenCoords[0]
      p.y = screenCoords[1]
      p.zoomLevels = []
    })

    tree.clear()
    tree.load(markerData)

    if (showCluster) {
      const sizeScale = properties.markerSize *  Math.min(Math.pow(1.5, viewport.zoom - 10), 1) * window.devicePixelRatio
      for (let z = 0; z <= 20; z++) {
        const radius = sizeScale / Math.sqrt(2) / Math.pow(2, z)

        markerData.filter(el => el.subtype !== 'cities').forEach(p => {
          if (p.zoomLevels[z] === undefined) {
            // this point does not belong to a cluster
            const { x, y } = p

            // find all points within radius that do not belong to a cluster
            const neighbors = tree
              .search({
                minX: x - radius,
                minY: y - radius,
                maxX: x + radius,
                maxY: y + radius
              })
              .filter(neighbor => neighbor.zoomLevels[z] === undefined)

            // only show the center point at this zoom level
            neighbors.forEach(neighbor => {
              if (neighbor === p) {
                p.zoomLevels[z] = {
                  icon: getIconName(neighbors.length),
                  size: getIconSize(neighbors.length),
                  points: neighbors
                }
              } else {
                neighbor.zoomLevels[z] = null
              }
            })
          }
        })
      }
    }
    return markerData
  }


  _getArcs (data) {
    if (!data) {
      return null
    }

    // const { flows, centroid } = selectedFeature.properties

    // const flows = [42]
    const arcs = data.map(el => {
      return {
        source: el[0],
        target: el[1],
        color: el[2],
        value: 200
      }
    })

    // const scale = scaleQuantile()
    //   .domain(arcs.map(a => Math.abs(a.value)))
    //   .range(inFlowColors.map((c, i) => i))
    //
    // arcs.forEach(a => {
    //   a.gain = Math.sign(a.value)
    //   a.quantile = [255, 0, 204]
    // })

    return arcs
  }

  // _onClick (event, s) {
  //   console.debug('onclick marker', event, s)
  //   return true
  // }

  render () {
    const { viewport, strokeWidth, showCluster, geoData, setTooltip, onHover, theme, onMarkerClick } = this.props
    const { animatedFeature, arcs, marker, texts /* geo */ } = this.state
    const z = Math.floor(viewport.zoom)
    const size = /*showCluster ? 1 :*/ Math.min(Math.pow(1.5, viewport.zoom - 10), 1)
    const updateTrigger = z * showCluster

    // console.debug("remder iconlayer with data", iconData)
    const layers = []

    if (marker && marker.length > 0) {
      layers.push(new IconLayer({
        id: 'icon',
        autoHighlight: true,
        highlightColor: RGBAtoArray(theme.highlightColors[0]),
        data: marker,
        pickable: true,
        iconAtlas: '/images/cluster-icon-atlas.png',
        iconMapping,
        sizeScale: properties.markerSize * size * window.devicePixelRatio,
        getPosition: d => d.coo,
        getIcon: d => (d.subtype === 'cities') ? 'marker-10' : (showCluster ? d.zoomLevels[z] && d.zoomLevels[z].icon : 'marker'),
        getSize: d => (d.subtype === 'cities') ? 4 : 6 /*(showCluster ? d.zoomLevels[z] && d.zoomLevels[z].size : 10)*/,
        onHover: e => onHover(e),
        onClick: onMarkerClick,
        updateTriggers: {
          getIcon: updateTrigger,
          getSize: updateTrigger
        }
      }))
    }

    if (texts && texts.length > 0) {
      layers.push(new TagmapLayer({
        id: 'cities-layer',
        data: texts,
        getWeight: x => /*normalize(x.pop) ||*/ Math.random()*100,
        getLabel: d => d.name,
        getPosition: d => d.coo,
        minFontSize: 24,
        maxFontSize: 32 * 2 - 14
      }))
    }

    if (arcs && arcs.length > 0) {
      layers.push(new ArcLayer({
        id: 'arc',
        data: arcs,
        getSourcePosition: d => d.source,
        getTargetPosition: d => d.target,
        getSourceColor: d => d.color,
        getTargetColor: d => d.color,
        strokeWidth
      }))
    }

    return <DeckGL {...viewport} layers={layers} />
  }
}
