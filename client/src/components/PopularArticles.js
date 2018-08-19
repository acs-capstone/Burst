import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPopularArticles } from '../store/articles'
import Grid from '@material-ui/core/Grid'
import UserProfile from './user-profile'
import Article from './Article'

class PopularArticles extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      selectedTopic: ''
    }
  }

  async componentDidMount() {
    const articles = await this.props.fetchPopularArticles()
    // console.log(articles)
    this.setState({
      articles
    })
  }

  handleClick() {
    //start video chat goes here
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <h4>Todays Most Popular Articles</h4>
          <Grid item xs={3}>
            <UserProfile />
          </Grid>
          <Grid item xs={8}>

            {this.state.articles.map(article => {
              return (
                <div key={article.url}>
                  <h2>{article.topic}</h2>
                  <div>
                    <button type="button" name="start-chat" onClick={this.handleClick}>
                      Join Video Burst
                  </button>
                    <ul className=".list-unstyled" key={article.url}>
                      <Article article={article} />
                    </ul>
                  </div>
                </div>
              )
            })}
          </Grid>
        </Grid>
      </div>
    )
  }

}

const mapState = state => ({
  articles: state.articles,
})

const mapDispatch = dispatch => {
  return {
    fetchPopularArticles: () => dispatch(fetchPopularArticles()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(PopularArticles)
