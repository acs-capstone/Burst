import React from 'react'

const ChoiceButton = props => {
  console.log('*SELECTED TOPICS**', props.selectedTopics)
  //[{id: 5, name: 'Elections'...}]
  // console.log('Props.Topic', props.topic)
  //{id: 5, name: 'Elections'...}

  // const selectedTopicIds = props.selectedTopics.map(topic => {
  //   console.log('topic.id', topic.id)
  //   return topic.id
  // })

  const selected = props.selectedTopics.includes(props.topic.id.toString())
  //returns true or false if the topic is selected on state
  // const selected = props.selectedTopics.includes(props.topic)
  console.log('selected', selected)

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
