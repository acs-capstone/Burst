import React, { Component } from 'react'
import ChoiceButton from './choice-button'
import Sources from './sources-menu'
import { fetchTopics } from '../store/topics'
import { connect } from 'react-redux'

class Topics extends Component {
  componentDidMount(evt) {
    this.props.fetchTopics()
  }

  render() {
    return (
      <div>
        {this.props.topics.map(topic => {
          return (
            <ChoiceButton topic={topic} handleClick={this.props.handleClick} />
          )
        })}
        <button type="submit" name="submit" onClick={this.props.handleClick}>
          Submit
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  topics: state.topics
})

const mapDispatch = dispatch => {
  return {
    fetchTopics: () => dispatch(fetchTopics())
  }
}

export default connect(
  mapState,
  mapDispatch
)(Topics)
