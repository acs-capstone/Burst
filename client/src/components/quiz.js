import React, { Component } from 'react'
import questions from './questions'
import Answers from './answers'
import Prompt from './prompt'
import Topics from './topics'
import SourcesMenu from './sources-menu'

export default class Quiz extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      score: 0,
      question: {},
      count: 0,
      hasSubmittedQuiz: false,
      hasSubmittedSources: false,
      hasSubmittedTopics: false,
      sources: [],
      topics: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    try {
      await this.setState({ questions, question: questions[0] })
    } catch (err) {
      console.err(err.message)
    }
  }

  handleChange(evt) {
    this.setState({ sources: [...this.state.sources, evt.target.value] })
  }

  handleClick(evt) {
    //update score on state with question value if in quiz portion
    if (!this.state.hasSubmittedQuiz) {
      this.setState({
        score: (this.state.score += +evt.target.value),
        count: (this.state.count += 1)
      })
      //keep displaying quiz questions until end of questions array
      if (this.state.count < this.state.questions.length) {
        this.setState({ question: questions[this.state.count] })
      } else {
        //if question number is same as length, questions are finished and quiz is submitted
        this.setState({ hasSubmittedQuiz: true })
      }
      //if quiz is submitted, but topics haven't been submitted, show topics component
    } else if (this.state.hasSubmittedQuiz && !this.state.hasSubmittedTopics) {
      if (evt.target.name === 'submit') {
        console.log('toipcs-chosen:', this.state.topics)
        this.setState({ hasSubmittedTopics: true })
      } else {
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
    } else {
      console.log(
        'sources:',
        this.state.sources,
        'topics:',
        this.state.topics,
        'score:',
        this.state.score
      )
    }

    //render the topics component or sources component?
  }
  //update question on state, so view changes

  render() {
    if (!this.state.hasSubmittedQuiz) {
      const question = this.state.question
      return (
        <div id={question.id}>
          <Prompt prompt={question.prompt} />
          <Answers answers={question.answers} handleClick={this.handleClick} />
        </div>
      )
    } else if (this.state.hasSubmittedQuiz && this.state.hasSubmittedTopics) {
      return (
        <SourcesMenu
          handleClick={this.handleClick}
          handleChange={this.handleChange}
        />
      )
    } else {
      return <Topics handleClick={this.handleClick} />
    }
  }
}

//eventually will need to pass down event handlers
