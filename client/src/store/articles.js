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
    const { data } = await axios.get(
      `http://localhost:8080/api/articles/${userId}`
    )
    dispatch(getArticles(data))
  } catch (err) {
    console.error(err)
  }
}

//   return async (dispatch) => {
//     try {
//       await axios.get()

//       const stringOfTopics = topics.map(topic => {
//         return topic.name
//       }).join(', ')

//       newsapi.v2.everything({
//         q: stringOfTopics
//       }).then(response =>
//         console.log(response))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }
// getArticlesThunk([{ name: 'trade' }, { name: 'healthcare' }])
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
