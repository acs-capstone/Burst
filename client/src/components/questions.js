import React, { Component } from 'react'
import questionsData from './questionsData'
import Answers from './answers'
import Prompt from './prompt'
import { updateUserThunk } from '../store/user'
import { connect } from 'react-redux'

class Questions extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    this.setState({ questions: questionsData })
  }

  async handleClick(evt) {
    try {
      const questions = this.state.questions
      const currentQuestionIndex = this.state.currentQuestionIndex
      evt.preventDefault()
      //if there are still questions left in array, keep looping through and rendering questions
      if (currentQuestionIndex < questions.length - 1) {
        await this.setState({
          score: (this.state.score += +evt.target.value),
          currentQuestionIndex: (this.state.currentQuestionIndex += 1)
        })
      } else {
        //when all questions have been aswered, calculate score and dispatch update userThnk
        let finalScore = Math.round(this.state.score / 2)
        //TODO: Change to 11 once all Q's are added
        console.log('USERID', this.props.userId)
        await this.props.updateUserThunk({
          poliOriId: finalScore,
          userId: this.props.userId
        })

        console.log('DONE!')
      }
    } catch (err) {
      console.err(err.message)
    }
  }

  render() {
    if (this.state.currentQuestionIndex < this.state.questions.length) {
      const question = this.state.questions[this.state.currentQuestionIndex]

      return (
        <div>
          <Prompt prompt={question.prompt} />
          <Answers answers={question.answers} handleClick={this.handleClick} />
        </div>
      )
    } else return null
  }
}

const mapState = state => ({
  user: state.user
})
const mapDispatch = dispatch => {
  return {
    updateUserThunk: userPrefObj => dispatch(updateUserThunk(userPrefObj))
  }
}

export default connect(
  null,
  mapDispatch
)(Questions)
