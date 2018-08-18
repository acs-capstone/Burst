import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SESSION = 'GET_SESSION'

/**
 * INITIAL STATE
 */
const initialSession = {}

/**
 * ACTION CREATORS
 */
const getSession = session => ({ type: GET_SESSION, session })

/**
 * THUNK CREATORS
 */
//gets all sources from db
export const getSessionThunk = () => async dispatch => {
  try {
    const { data } = await axios.get('/video/start')
    dispatch(getSession(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(session = initialSession, action) {
  switch (action.type) {
    case GET_SESSION:
      return action.session
    default:
      return session
  }
}
