import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SESSION = 'GET_SESSION'
const DELETE_SESSION = 'DELETE_SESSION'

/**
 * INITIAL STATE
 */
const initialSession = {}

/**
 * ACTION CREATORS
 */
const getSession = session => ({ type: GET_SESSION, session })
const deleteSession = session => ({ type: DELETE_SESSION })

/**
 * THUNK CREATORS
 */
//gets all sources from db
export const getVideoSessionThunk = id => async dispatch => {
  try {
    console.log('IN THUNK!')
    const { data } = await axios.get(`/video/${id}`)
    console.log('**DATA', data)
    dispatch(getSession(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteVideoSessionThunk = session => async dispatch => {
  try {
    const { data } = await axios.delete(
      `/video/disconnect/${session.sessionId}`
    )
    dispatch(deleteSession(data))
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
