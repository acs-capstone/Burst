import React from 'react'

const Answers = props => {
  // console.log('answers', props.answers)
  const answers = props.answers
  const handleClick = props.handleClick

  // console.log('handle', handleClick)

  if (answers && answers.length) {
    return answers.map(answer => {
      return (
        <form key={answer.id}>
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
