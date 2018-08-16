import React from 'react'

const ChoiceButton = props => {
  //returns true or false if the topic is selected on state
  const selected = props.selectedTopics.includes(props.topic.id.toString())

  //if array of topics on state contains specific topic, highlight it, otherwise don't
  if (selected) {
    return (
      <button
        className="btn btn-primary"
        value={props.topic.id}
        onClick={props.handleClick}
      >
        {props.topic.name}
      </button>
    )
  } else {
    return (
      <button
        className="btn btn-secondary"
        value={props.topic.id}
        onClick={props.handleClick}
      >
        {props.topic.name}
      </button>
    )
  }
}

export default ChoiceButton
