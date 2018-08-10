import React, { Component } from 'react';
import ChoiceButton from './choice-button';
import Sources from './sources-menu';

const topics = [
  'Women’s Rights',
  'Finance & Tax',
  'Gun Control',
  'Immigration',
  'Elections',
  'Energy & Environment',
  'International Relations',
  'Healthcare',
  'Trade'
];

export default class Topics extends Component {
  constructor() {
    super();
    this.state = {
      topics: [],
      choices: [],
      hasSubmitted: false
    };
    this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(evt) {
    this.setState({ topics });
  }
  handleClick(evt) {
    if (evt.target.name === 'submit') {
      this.setState({ hasSubmitted: true });
    } else {
      console.log('CURRENT CHOICES', this.state.choices);
      //need some logic for:
      //if button is clicked it is highlighted and added to choices array. Otherwise, it will be unhighlited and it will be removed from choices
    }
  }

  render() {
    return (
      <div>
        {this.state.topics.map(topic => {
          return (
            <ChoiceButton choice={topic} handleClick={this.props.handleClick} />
          );
        })}
        <button type="submit" name="submit" onClick={this.props.handleClick}>
          Submit
        </button>
      </div>
    );
  }
}
