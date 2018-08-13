import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SOURCES = 'GET_SOURCES'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getAllSources = sources => ({ type: GET_SOURCES, sources })

/**
 * THUNK CREATORS
 */
//gets all sources from db
export const getSourcesList = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/sources') //TODO: need to change for deployment process.env
      dispatch(getAllSources(data))
    } catch (error) {
      console.error(error)
    }
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SOURCES:
      return action.sources
    default:
      return state
  }
}
