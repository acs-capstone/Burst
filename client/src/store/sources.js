import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_SOURCES = 'GOT_ALL_SOURCES'
const TOGGLE_SOURCE = 'TOGGLE_SOURCE'
/**
 * INITIAL STATE
 */
const initialSources = []

/**
 * ACTION CREATORS
 */
const gotAllSources = sources => ({ type: GOT_ALL_SOURCES, sources })

export const toggleSource = id => ({
  type: TOGGLE_SOURCE,
  id
})
/**
 * THUNK CREATORS
 */
//gets all sources from db
export const getAllSources = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/sources')
    dispatch(gotAllSources(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (sources = initialSources, action) {
  switch (action.type) {
    case GOT_ALL_SOURCES:
      return action.sources
    case TOGGLE_SOURCE: {
      const source = sources.find(srce => srce.id === action.id)
      source.selected = !source.selected

      return [...sources]
    }
    default:
      return sources
  }
}
