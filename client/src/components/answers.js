import React from 'react'

const Answers = props => {
  // console.log('answers', props.answers)
  const answers = props.answers
  const handleClick = props.handleClick

  // console.log('handle', handleClick)

  if (props.answers && props.answers.length) {
    return props.answers.map(answer => {
      return (
        <form id={answer.id}>
          <button
            className="single-answer"
            value={answer.value}
            onClick={handleClick}
            type="submit"
          >
            {answer.content}
          </button>
        </form>
      )
    })
  } else {
    return null
  }
}

export default Answers
