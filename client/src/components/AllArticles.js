import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { me } from '../store'

import ArticleList from './ArticleList'
const articlesObj = require('./bitcoin.json')
const articles = articlesObj.articles

const initialState = {
  articles: [],
  user: {}
}

class AllArticles extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  componentDidMount() {
    console.log('COMPONENT MOUNTED')
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
            All Articles
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
  articles: articles,
  user: state.user
})

export default connect(mapState)(AllArticles)
