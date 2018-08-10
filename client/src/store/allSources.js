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
const getAllSources = (sources) => ({ type: GET_SOURCES, sources })

/**
 * THUNK CREATORS
 */
//gets all sources from db
export const getSourcesList = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('localhost:8080/api/sources') //need to change for deployment process.env
      dispatch(getAllSources(data))
    } catch (error) {
      console.error(error)
    }
  }
}
/**
 * REDUCER
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SOURCES:
      return action.sources
  }
}
