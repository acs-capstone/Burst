import React from 'react'
import { connect } from 'react-redux'
import { toggleSource } from '../store'
// GOALS
// LIST TOP 10 news sources
// Allow them to search for additional sources (this would look terrible as
// just a list though, but I think there should be a way to fix, e.g. look at
// what feedly does)

const SourceCard = props => {
  const { selected, source, toggleSource, handleClick } = props

  return (
    <div
      className={selected ? 'card bg-primary' : 'card'}
      onClick={() => handleClick(source)}
    >
      <div className="card-body selected">
        <h6 className="card-title">{source.name}</h6>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  toggleSource: id => {
    dispatch(toggleSource(id))
  }
})

export default connect(
  null,
  mapDispatch
)(SourceCard)

//
// <input
//   className="form-check-input"
//   type="checkbox"
//   value={source.name}
//   id={source.id}
//   onChange={() => {
//     toggleSource(source.id)
//   }}
// />
// <label className="form-check-label" htmlFor={source.id}>
//   {source.name}
// </label>
