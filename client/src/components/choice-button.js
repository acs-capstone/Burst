import React from 'react';

const ChoiceButton = props => {
  return (
    <button
      className="choice-button"
      // type="submit"
      value={props.choice}
      onClick={props.handleClick}
    >
      {props.choice}
    </button>
  );
};

export default ChoiceButton;
