import React from 'react'

const ChoiceButton = props => {
  //returns true or false if the source is selected on state
  const selected = props.selectedSources.includes(props.source.id.toString())

  //if array of sources on state contains specific source, highlight it, otherwise don't
  if (selected) {
    return (
      <button
        className="choice-selected"
        value={props.source.id}
        onClick={props.handleClick}
      >
        {props.source.name}
      </button>
    )
  } else {
    return (
      <button
        className="choice-unselected"
        value={props.source.id}
        onClick={props.handleClick}
      >
        {props.source.name}
      </button>
    )
  }
}

export default ChoiceButton
