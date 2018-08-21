import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPopularArticles } from '../store/articles'
import Grid from '@material-ui/core/Grid'
import Article from './Article'

class PopularArticles extends Component {
  constructor() {
    super()
    this.state = {
      isMounted: false,
      articles: [],
      selectedTopic: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    this.setState({
      isMounted: true
    })
    await this.props.fetchPopularArticles()
    if (this.state.isMounted) {
      this.setState({
        articles: this.props.articles
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }

  handleClick(evt) {
    evt.preventDefault()
    this.props.history.push(`/video/${evt.target.value}`)
  }

  render() {
    return (
      <div>
        <h4>Today's Most Popular Articles By Topic</h4>
        <button
          type="button"
          className="badge badge-danger"
          name="start-chat"
          value="1"
          onClick={this.handleClick}
        >
          Join Video Burst - Human Rights
        </button>
        <button
          type="button"
          className="badge badge-danger"
          name="start-chat"
          value="2"
          onClick={this.handleClick}
        >
          Join Video Burst - Finance & Tax
        </button>

        <Grid container direction="row" justify="center">
          {this.state.articles.map(article => {
            return (
              <Grid item xs={4} key={article.url}>
                <div>
                  <h5>{article.topic}</h5>
                  <div>
                    <button
                      type="button"
                      className="badge badge-danger"
                      name="start-chat"
                      onClick={this.handleClick}
                    >
                      Join Video Burst
                    </button>
                    <ul className=".list-unstyled">
                      <Article article={article} />
                    </ul>
                  </div>
                </div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  articles: state.articles
})

const mapDispatch = dispatch => {
  return {
    fetchPopularArticles: () => dispatch(fetchPopularArticles())
  }
}

export default connect(
  mapState,
  mapDispatch
)(PopularArticles)
