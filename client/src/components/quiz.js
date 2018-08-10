import React, { Component } from 'react';
import questions from './questions';
import Answers from './answers';
import Prompt from './prompt';

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      score: 0,
      question: {},
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    try {
      await this.setState({ questions, question: questions[0] });
    } catch (err) {
      console.err(err.message);
    }
  }

  handleClick(evt) {
    //update score on state with question value
    this.setState({
      score: (this.state.score += +evt.target.value),
      count: (this.state.count += 1)
    });
    if (this.state.count < this.state.questions.length) {
      this.setState({ question: questions[this.state.count] });
    } else {
      //render the topics component or sources component?
    }
    //update question on state, so view changes
  }

  render() {
    const question = this.state.question;
    return (
      <div id={question.id}>
        <Prompt prompt={question.prompt} />
        <Answers answers={question.answers} handleClick={this.handleClick} />
      </div>
    );
  }
}

//eventually will need to pass down event handlers
