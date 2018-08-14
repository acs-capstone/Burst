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
      evt.preventDefault()
      //if there are still questions left in array, keep looping through and rendering questions
      if (this.state.currentQuestionIndex < this.state.questions.length) {
        this.setState({
          score: (this.state.score += +evt.target.value),
          currentQuestionIndex: (this.state.currentQuestionIndex += 1)
        })
      } else {
        //when all questions have been aswered, calculate score and dispatch update userThnk
        let finalScore = Math.round(this.state.score / 2)
        //TODO: Change to 11 once all Q's are added
        await this.props.updateUserThunk({ score: finalScore })
      }
    } catch (err) {
      console.err(err.message)
    }
  }

  render() {
    if (this.state.questions && this.state.questions.length) {
      const question = this.state.questions[this.state.currentQuestionIndex]
      console.log('CURRENT Q', question.id)
      return (
        <div>
          <Prompt id={question.id} prompt={question.prompt} />
          <Answers
            id={question.id}
            answers={question.answers}
            handleClick={this.handleClick}
          />
        </div>
      )
    } else return null
  }
}

const mapDispatch = dispatch => {
  return {
    updateUserThunk: userPrefObj => dispatch(updateUserThunk(userPrefObj))
  }
}

export default connect(
  null,
  mapDispatch
)(Questions)
