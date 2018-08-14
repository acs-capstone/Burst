import React, { Component } from 'react'
import ChoiceButton from './choice-button'
import { fetchTopics } from '../store/topics'
import { connect } from 'react-redux'

class Topics extends Component {
  constructor() {
    super()
    this.state = {
      topics: []
    }
  }

  componentDidMount(evt) {
    this.props.fetchTopics() //gets all topics
  }

  handleChooseTopic(evt) { //if state doesn't include the topic, add its to state, otherwise it removes it
    !this.state.topics.includes(evt.target.value)
      ? this.setState({
        topics: [...this.state.topics, evt.target.value]
      })
      : this.setState({
        topics: this.state.topics.filter(topic => {
          if (topic !== evt.target.value) return topic
        })
      })
  }

  handleSubmit(evt) {

  }

  render() {
    return (
      <div>
        {this.props.topics.map(topic => {
          return (
            <ChoiceButton topic={topic} handleClick={this.props.handleChooseTopics} />
          )
        })}
        <button type="submit" name="submit" onClick={this.props.handleSubmit}>
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
