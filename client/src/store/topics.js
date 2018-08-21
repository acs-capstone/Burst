import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TOPICS = 'GET_TOPICS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getTopics = topics => ({ type: GET_TOPICS, topics })

/**
 * THUNK CREATORS
 */
//gets articles in bubble

export const fetchTopics = () => async dispatch => {
  try {
    const { data } = await axios.get(`api/topics`)
    dispatch(getTopics(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOPICS:
      return action.topics
    default:
      return state
  }
}
