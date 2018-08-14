import React, { Component } from 'react'
import questionsData from './questionsData'
import Answers from './answers'
import Prompt from './prompt'
import { updateUserThunk } from '../store/user'

class Questions extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      currentQuestion: 0
    }
  }

  async componentDidMount() {}

  render() {
    return (
      <div id={question.id}>
        <Prompt prompt={question.prompt} />
        <Answers
          answers={question.answers}
          handleClick={this.handleClick}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
