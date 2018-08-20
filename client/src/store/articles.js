import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ARTICLES = 'GET_ARTICLES'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getArticles = articles => ({ type: GET_ARTICLES, articles })

/**
 * THUNK CREATORS
 */
//gets articles in bubble

export const fetchArticles = (userId) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/articles/${userId}`)
    dispatch(getArticles(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchPopularArticles = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/articles/popular')
    dispatch(getArticles(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return action.articles
    default:
      return state
  }
}
