import utilsQuery from './utils/query'

export const SET_WIKI_ID = 'SET_WIKI_ID'
export const SET_DATA = 'SET_DATA'
export const SET_AREA_ITEM = 'SET_AREA_ITEM'
export const SET_EPIC_INDEX = 'SET_EPIC_INDEX'
export const SET_MARKER_ITEM = 'SET_MARKER_ITEM'
export const SET_LINKED_ITEM = 'SET_LINKED_ITEM'
export const SET_VALUE = 'SET_VALUE'
export const SET_FULL_ITEM = 'SET_FULL_ITEM'
export const SET_EPIC_ITEM = 'SET_EPIC_ITEM'
export const DESELECT_ITEM = 'DESELECT_ITEM'
export const SET_AUTOPLAY = 'SET_AUTOPLAY'

export const TYPE_AUTOPLAY = 'autoplay'
export const TYPE_AREA = 'areas'
export const TYPE_MARKER = 'markers'
export const TYPE_METADATA = 'metadata'
export const TYPE_LINKED = 'linked'
export const TYPE_EPIC = 'epic'

export const WIKI_RULER_TIMELINE = 'WIKI_RULER_TIMELINE'
export const WIKI_PROVINCE_TIMELINE = 'WIKI_PROVINCE_TIMELINE'

/** Actions **/

export const setWikiId = id => ({
  type: SET_WIKI_ID,
  payload: id,
})

export const selectValue = value => {
  utilsQuery.updateQueryStringParameter('value', value)
  return {
    type: SET_VALUE,
    payload: value,
  }
}

export const setFullItem = (wiki, province, type, data) => {
  utilsQuery.updateQueryStringParameter('type', type)
  utilsQuery.updateQueryStringParameter('value', province)

  return {
    type: SET_FULL_ITEM,
    payload: [wiki, province, type, data],
  }
}

export const setData = data => ({
  type: SET_DATA,
  payload: data,
})

export const setAutoplay = data => ({
  type: SET_AUTOPLAY,
  payload: data,
})

export const setEpicContentIndex = index => ({
  type: SET_EPIC_INDEX,
  payload: index,
})

export const selectAreaItem = (wiki, province) => {
  utilsQuery.updateQueryStringParameter('type', TYPE_AREA)
  utilsQuery.updateQueryStringParameter('value', province)

  return {
    type: SET_AREA_ITEM,
    payload: [wiki, province],
  }
}

export const selectEpicItem = (wiki, year, id) => {
  utilsQuery.updateQueryStringParameter('type', TYPE_EPIC)
  utilsQuery.updateQueryStringParameter('value', id)
  return {
    type: SET_EPIC_ITEM,
    payload: [wiki, year, id],
  }
}

export const selectLinkedItem = (wiki, value = wiki) => {
  utilsQuery.updateQueryStringParameter('type', TYPE_LINKED)
  utilsQuery.updateQueryStringParameter('value', wiki)
  return {
    type: SET_LINKED_ITEM,
    payload: [wiki, value],
  }
}

export const selectMarkerItem = (wiki, value = wiki) => {
  utilsQuery.updateQueryStringParameter('type', TYPE_MARKER)
  utilsQuery.updateQueryStringParameter('value', wiki)
  return {
    type: SET_MARKER_ITEM,
    payload: [wiki, value],
  }
}

export const deselectItem = () => ({
  type: DESELECT_ITEM
})

/** Reducers **/

export const selectedItemReducer = (defaultState = { 'wiki': '', 'type': '', 'value': '', 'data': false }) =>
  (previousState = defaultState, { type, payload }) => {
    switch (type) {
      case SET_VALUE:
        return {
          ...previousState,
          value: payload,
        }
      case SET_WIKI_ID:
        return {
          ...previousState,
          wiki: payload,
        }
      case SET_DATA:
        return {
          ...previousState,
          data: payload,
        }
      case SET_EPIC_INDEX: {
        const prevData = previousState.data
        if (prevData) prevData.contentIndex = payload
        return {
          ...previousState,
          data: prevData,
        }
      }
      case SET_FULL_ITEM:
        return {
          wiki: payload[0],
          value: payload[1],
          type: payload[2],
          data: payload[3]
        }
      case SET_AUTOPLAY:
        return {
          wiki: '',
          value: '',
          type: TYPE_AUTOPLAY,
          data: payload
        }
      case SET_AREA_ITEM:
        return {
          ...previousState,
          wiki: payload[0],
          value: payload[1],
          type: TYPE_AREA,
        }
      case SET_EPIC_ITEM:
        return {
          ...previousState,
          wiki: payload[0],
          value: payload[2],
          type: TYPE_EPIC,
          data: false
        }
      case SET_LINKED_ITEM:
        return {
          wiki: payload[0],
          value: payload[1],
          type: TYPE_LINKED,
          data: false
        }
      case SET_MARKER_ITEM:
        return {
          wiki: payload[0],
          value: payload[1],
          type: TYPE_MARKER,
          data: false
        }
      case DESELECT_ITEM:
        return defaultState
      default:
        return previousState
    }
  }
