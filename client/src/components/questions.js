import React, { Component } from 'react'
import questionsData from './questionsData'
import Answers from './answers'
import Prompt from './prompt'
import { updateUserThunk } from '../store/user'
import connect from 'react-redux/lib/connect/connect'

class Questions extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0
    }
    this.handleClick = this.handleClick.bind(TouchList)
  }

  async componentDidMount() {
    this.setState({ questions: questionsData })
  }

  async handleClick(evt) {
    try {
      //if there are still questions left in array, keep looping through and rendering questions
      if (this.state.currentQuestionIndex < this.state.questions.length) {
        this.setState({
          score: (this.state.score += +evt.target.value),
          currentQuestionIndex: (currentQuestionIndex += 1)
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
    const question = this.state.questions[this.state.currentQuestion]
    return (
      <div id={question.id}>
        <Prompt prompt={question} />
        <Answers answers={question.answers} handleClick={this.handleClick} />
      </div>
    )
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
)(Quiz)
