import React, { Component } from 'react'
import ChoiceButton from './choice-button'
import { connect } from 'react-redux'
import { updateUserThunk, fetchTopics } from '../store'

class Topics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: []
    }
    this.handleClickTopic = this.handleClickTopic.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount(evt) {
    console.log('TOPICS', this.props.user.topics)
    await this.setState({
      topics: this.props.user.topics
    }) //sets users topics to state if they have any already - TO DO: these should be highlighted when navigating to the page
    await this.props.fetchTopics() //gets all topics
  }

  async handleClickTopic(evt) {
    //checks if topics is already on state, if so add its to state, otherwise it removes it
    !this.state.topics.includes(evt.target.value)
      ? await this.setState({
          topics: [...this.state.topics, evt.target.value]
        })
      : await this.setState({
          topics: this.state.topics.filter(topic => {
            if (topic !== evt.target.value) return topic
          })
        })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    console.log('PROPS', this.props)
    const userPrefObj = {
      userId: this.props.user.id,
      arrayOfTopics: this.state.topics
    }
    this.props.updateUserThunk(userPrefObj)
    if (this.props.user.sources && this.props.history) {
      this.props.history.push('/home')
    }
  }

  render() {
    return (
      <div>
        {this.props.topics.map(topic => {
          return (
            <ChoiceButton
              key={topic.id}
              topic={topic}
              handleClick={this.handleClickTopic}
              selectedTopics={this.state.topics}
            />
          )
        })}
        <button type="submit" name="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  topics: state.topics
})

const mapDispatch = dispatch => {
  return {
    fetchTopics: () => dispatch(fetchTopics()),
    updateUserThunk: user => dispatch(updateUserThunk(user))
  }
}

export default connect(
  mapState,
  mapDispatch
)(Topics)
