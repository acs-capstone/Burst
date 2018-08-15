import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import { me } from '../store'

import ArticleList from './ArticleList'
import { fetchArticles } from '../store/articles'
import { getUserThunk } from '../store/user'

//const articlesObj = require('./bitcoin.json')
//const articles = articlesObj.articles

const initialState = {
  articles: [],
  user: {}
}

class AllArticles extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  async componentDidMount() {
    try {
      const user = await this.props.getUserThunk(this.props.user.id)
      const articles = await this.props.fetchArticles(this.props.user.id)
      console.log('***ARTICLES', articles)

    } catch (err) {
      console.error(err.message)
    }
  }

  handleChange = evt => this.setState({ [evt.target.name]: evt.target.value })

  clearFilters = () => {
    this.setState = initialState
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-11">
            <h4>Your Articles</h4>
            <ArticleList
              user={this.props.user}
              articles={this.props.articles}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  articles: state.articles,
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    fetchArticles: userId => dispatch(fetchArticles(userId)),
    getUserThunk: userId => dispatch(getUserThunk(userId))
  }
}

export default connect(
  mapState,
  mapDispatch
)(AllArticles)
