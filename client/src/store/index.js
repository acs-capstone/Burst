import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import sources from './sources'
import articles from './articles'
import topics from './topics'
import session from './session'

const reducer = combineReducers({ user, sources, articles, topics, session })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './articles'
export * from './topics'
export * from './sources'
export * from './session'
