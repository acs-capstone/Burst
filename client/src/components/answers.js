import React from 'react'
import Button from '@material-ui/core/Button'

const Answers = props => {
  // console.log('answers', props.answers)
  const answers = props.answers
  const handleClick = props.handleClick

  // console.log('handle', handleClick)

  if (props.answers && props.answers.length) {
    return props.answers.map(answer => {
      return (
        // <Button variant="outlined" fullWidth={true}>
        <form key={answer.id}>
          <button
            id="quiz-button"
            className="single-answer"
            value={answer.value}
            onClick={handleClick}
            type="submit"
          >
            {answer.content}
          </button>
        </form>
        // {answer.content}
        // </Button>
      )
    })
  } else {
    return null
  }
}

export default Answers

// <form key={answer.id}>
// <button
//   id="quiz-button"
//   className="single-answer"
//   value={answer.value}
//   onClick={handleClick}
//   type="submit"
// >
//   {answer.content}
// </button>
// </form>
