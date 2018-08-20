import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPopularArticles } from '../store/articles'
import Grid from '@material-ui/core/Grid'
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
    await this.props.fetchPopularArticles()
    this.setState({
      articles: this.props.articles
    })
  }

  handleClick() {
    //start video chat goes here
  }

  render() {
    return (
      <div>
        <h4>Today's Most Popular Articles By Topic</h4>
        <Grid direction="row" justify="center">
          {this.state.articles.map(article => {
            return (
              <Grid item xs={4}>
                <div key={article.url}>
                  <h5>{article.topic}</h5>
                  <div>
                    <button type="button" className="badge badge-danger" name="start-chat" onClick={this.handleClick}>
                      Join Video Burst
                  </button>
                    <ul className=".list-unstyled" key={article.url}>
                      <Article article={article} />
                    </ul>

                  </div>
                </div>
              </Grid>
            )
          })}
        </Grid>
      </div >
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
