import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import { GridList, GridTile } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import CloseIcon from 'material-ui/svg-icons/content/clear'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { Tabs, Tab } from 'material-ui/Tabs'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import SwipeableViews from 'react-swipeable-views'
import { translate, ViewTitle } from 'admin-on-rest'
import axios from 'axios'
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors'

import { changeTheme as changeThemeAction, changeLocale as changeLocaleAction } from './actionReducers'
import properties from "../../../properties";

const styles = {
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
  discoverDialogStyle: {
    width: '100%',
    // maxWidth: 'none',
    transform: '',
    transition: 'opacity 1s',
    opacity: 0,
    // display: 'flex',
    // '-ms-flex-direction': 'row',
    // '-webkit-flex-direction': 'row',
    // 'flex-direction': 'row',
    //   '-ms-flex-wrap': 'wrap',
    // '-webkit-flex-wrap': 'wrap',
    // 'flex-wrap': 'wrap',
    maxWidth: '100%',
    backgroundColor: 'transparent'
    // margin-left:auto,margin-right:auto,position:absolute,top:0,right:0,bottom:0,left:0
  },
  overlayStyle: {
    background: 'rgba(0,0,0,.8)',
    pointerEvents: 'none'
  },
  toolbarTitleStyle: {
    pointerEvents: 'none',
    color: 'white',
    zIndex: 1000000
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    // height: 450,
    overflowY: 'auto',
    maxWidth: '1024px',
    margin: '0 auto'
  },
}

class Discover extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
      currentYearLoaded: 3000,
      hiddenElement: true,
      tilesData: [],
      tilesStoriesData: [],
      tilesPeopleData: [],
      tilesCitiesData: [],
      tilesBattlesData: [],
      tilesOtherData: []
    }
  }

  handleChange = (value) => {
    this.setState({ slideIndex: value })
  }

  handleClose = () => {
    this.props.history.push('/')
  }

  componentDidMount = () => {
    this.setState({ hiddenElement: false })
  }

  componentWillUnmount = () => {
    this.setState({ hiddenElement: true })
  }

  componentWillMount () {
    const { basemap, activeArea, selectedYear, activeMarkers, selectedItem, areaData } = this.props
    console.debug('### MAP componentWillReceiveProps', this.props)

    /** Acting on store changes **/
    if (this.state.currentYearLoaded !== selectedYear) {
      console.debug('DISCOVER.js ### new year changed to ' + selectedYear)

      axios.get(properties.chronasApiHost + '/metadata?year=' + selectedYear + '&delta=10&type=i')
        .then(response => {
          const newTilesData = []
          const res = response.data
          res.forEach((imageItem) => {
            newTilesData.push({
              img: imageItem._id,
              title: imageItem.data.title,
              author: imageItem.data.source,
            })
          })
          this.setState({
            currentYearLoaded: selectedYear,
            tilesData: newTilesData })
        })

      axios.get(properties.chronasApiHost + '/metadata?year=' + selectedYear + '&delta=100&type=i&subtype=cities')
        .then(response => {
          const newTilesData = []
          const res = response.data
          res.forEach((imageItem) => {
            newTilesData.push({
              img: imageItem._id,
              title: imageItem.data.title,
              author: imageItem.data.source,
            })
          })
          this.setState({
            currentYearLoaded: selectedYear,
            tilesCitiesData: newTilesData })
        })

      axios.get(properties.chronasApiHost + '/metadata?year=' + selectedYear + '&delta=100&type=i&subtype=battle')
        .then(response => {
          const newTilesData = []
          const res = response.data
          res.forEach((imageItem) => {
            newTilesData.push({
              img: imageItem._id,
              title: imageItem.data.title,
              author: imageItem.data.source,
            })
          })
          this.setState({
            currentYearLoaded: selectedYear,
            tilesBattlesData: newTilesData })
        })

      axios.get(properties.chronasApiHost + '/metadata?year=' + selectedYear + '&delta=100&type=i&subtype=misc')
        .then(response => {
          const newTilesData = []
          const res = response.data
          res.forEach((imageItem) => {
            newTilesData.push({
              img: imageItem._id,
              title: imageItem.data.title,
              author: imageItem.data.source,
            })
          })
          this.setState({
            currentYearLoaded: selectedYear,
            tilesOtherData: newTilesData })
        })
    }
  }

  render () {
    console.debug('rendering discoverjs')
    const { theme, locale, changeTheme, changeLocale, menuItemActive, selectedYear, translate } = this.props
    const { tilesData, tilesStoriesData, tilesBattlesData, tilesCitiesData, tilesPeopleData, tilesOtherData } = this.state

    return (
      <div>
        <Toolbar style={{ zIndex: 10000, color: 'white', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}>
          <ToolbarGroup>
            <ToolbarTitle style={styles.toolbarTitleStyle} text={translate('pos.discover_label') + selectedYear} />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton style={{ zIndex: 10000 }} touch key={'close'} containerElement={<Link to='/' />}>
              <CloseIcon color={styles.toolbarTitleStyle.color} />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Dialog open
          autoDetectWindowHeight={false}
          modal={false}
          onRequestClose={this.handleClose}
          contentClassName={(this.state.hiddenElement) ? '' : 'classReveal dialogBackgroundHack'}
          contentStyle={styles.discoverDialogStyle}
          bodyStyle={{ backgroundColor: 'transparent', border: 'none' }}
          actionsContainerStyle={{ backgroundColor: red400 }}
          overlayStyle={styles.overlayStyle}
          style={{ backgroundColor: 'transparent', overflow: 'auto' }}
          titleStyle={{ backgroundColor: 'transparent', borderRadius: 0 }}
          autoScrollBodyContent={false}>

          <AutoRotatingCarousel
            style={{ position: 'relative', transform: 'none', backgroundColor: 'none' }}
            contentStyle={{ transform: 'none',
              backgroundColor: 'none',
              height: '512px',
              maxWidth: '1024px',
              marginTop: '16px',
              width: '80%' }}
            open
            landscape
          >
            <Slide
              media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
              mediaBackgroundStyle={{ backgroundColor: red400 }}
              contentStyle={{ backgroundColor: red600 }}
              mediaStyle={{ borderRadius: 0 }}
              title='This is a very cool feature'
              subtitle='Just using this will blow your mind.'
            />
            <Slide
              media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
              mediaBackgroundStyle={{ backgroundColor: blue400 }}
              contentStyle={{ backgroundColor: blue600 }}
              title='Ever wanted to be popular?'
              subtitle='Well just mix two colors and your are good to go!'
            />
            <Slide
              media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
              mediaBackgroundStyle={{ backgroundColor: green400 }}
              contentStyle={{ backgroundColor: green600 }}
              title='May the force be with you'
              subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars universe.'
            />
          </AutoRotatingCarousel>

          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
            tabItemContainerStyle={{
              backgroundColor: 'rgba(0,0,0,0)',
              margin: '0 auto',
              maxWidth: '600px'
            }}
            style={{
              margin: '0 auto',
              width: '600px',
              marginBottom: '1em',
              marginTop: '1em' }}
          >
            <Tab label='HIGHLIGHTS' value={0} />
            <Tab label='STORIES' value={1} />
            <Tab label='PEOPLE' value={2} />
            <Tab label='BATTLES' value={3} />
            <Tab label='CITIES' value={4} />
            <Tab label='OTHER' value={5} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}>
            {/* // TAB 0 */}
            <div style={styles.root}>
              <GridList
                cols={2}
                cellHeight={200}
                padding={1}
                style={styles.gridList}
              >
                {tilesData.map((tile) => (
                  <GridTile
                    key={tile.img}
                    title={tile.title}
                    actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
                    actionPosition='left'
                    titlePosition='top'
                    titleBackground='linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                  >
                    <img src={tile.img} />
                  </GridTile>
                ))}
              </GridList>
            </div>
            {/* TAB 1 */}
            <div style={styles.slide}>
              <GridList
                cols={2}
                cellHeight={200}
                padding={1}
                style={styles.gridList}
              >
                {tilesStoriesData.map((tile) => (
                  <GridTile
                    key={tile.img}
                    title={tile.title}
                    actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
                    actionPosition='left'
                    titlePosition='top'
                    titleBackground='linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                  >
                    <img src={tile.img} />
                  </GridTile>
                ))}
              </GridList>
            </div>
            <div style={styles.slide}>
              <GridList
                cols={2}
                cellHeight={200}
                padding={1}
                style={styles.gridList}
              >
                {tilesPeopleData.map((tile) => (
                  <GridTile
                    key={tile.img}
                    title={tile.title}
                    actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
                    actionPosition='left'
                    titlePosition='top'
                    titleBackground='linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                  >
                    <img src={tile.img} />
                  </GridTile>
                ))}
              </GridList>
            </div>
            <div style={styles.root}>
              <GridList
                cols={2}
                cellHeight={200}
                padding={1}
                style={styles.gridList}
              >
                {tilesBattlesData.map((tile) => (
                  <GridTile
                    key={tile.img}
                    title={tile.title}
                    actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
                    actionPosition='left'
                    titlePosition='top'
                    titleBackground='linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                  >
                    <img src={tile.img} />
                  </GridTile>
                ))}
              </GridList>
            </div>
            {/* TAB 3 */}
            <div style={styles.slide}>
              <GridList
                cols={2}
                cellHeight={200}
                padding={1}
                style={styles.gridList}
              >
                {tilesCitiesData.map((tile) => (
                  <GridTile
                    key={tile.img}
                    title={tile.title}
                    actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
                    actionPosition='left'
                    titlePosition='top'
                    titleBackground='linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                  >
                    <img src={tile.img} />
                  </GridTile>
                ))}
              </GridList>
            </div>
            {/* TAB 5 */}
            <div style={styles.slide}>
              <GridList
                cols={2}
                cellHeight={200}
                padding={1}
                style={styles.gridList}
              >
                {tilesOtherData.map((tile) => (
                  <GridTile
                    key={tile.img}
                    title={tile.title}
                    actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
                    actionPosition='left'
                    titlePosition='top'
                    titleBackground='linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                  >
                    <img src={tile.img} />
                  </GridTile>
                ))}
              </GridList>
            </div>
          </SwipeableViews>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedYear: state.selectedYear,
  theme: state.theme,
  locale: state.locale,
  menuItemActive: state.menuItemActive,
})

export default connect(mapStateToProps, {
  changeLocale: changeLocaleAction,
  changeTheme: changeThemeAction,
})(translate(Discover))
