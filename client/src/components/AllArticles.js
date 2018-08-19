import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArticleList from './ArticleList'
import { fetchArticles } from '../store/articles'
import { getUserThunk } from '../store/user'
import UserProfile from './user-profile'
import Grid from '@material-ui/core/Grid'

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
      //DO WE NEED THESE? WE ARENT CURRENTLY USING THEM,
      //just getting user and article off state
      //do we want to setState with the newly fetched user and articles?
      // const user = await this.props.getUserThunk(this.props.user.id)
      // const articles = await this.props.fetchArticles(this.props.user.id)
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
      // <div className="container">
      //   <div className="row">
      //     <div className="col-lg-11">
      <div>
        <Grid container spacing={24}>
          {/* <h4>Your Articles</h4> */}
          <Grid item xs={3}>
            <UserProfile />
          </Grid>
          <Grid item xs={8}>
            <ArticleList
              user={this.props.user}
              articles={this.props.articles}
            />
          </Grid>
        </Grid>
      </div>
      //   </div>
      // </div>
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
