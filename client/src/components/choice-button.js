import React from 'react'

const ChoiceButton = props => {
  return (
    <button
      className="choice-button"
      // type="submit"
      value={props.topic.id}
      onClick={props.handleClick}
    >
      {props.topic.name}
    </button>
  )
}

export default ChoiceButton
