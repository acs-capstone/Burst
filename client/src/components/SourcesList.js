import React from 'react'
import SourceCard from './SourceCard'

// GOALS
// LIST TOP 10 news sources
// Allow them to search for additional sources (this would look terrible as
// just a list though, but I think there should be a way to fix, e.g. look at
// what feedly does)

const SourcesList = props => {
  const { sources, handleSubmit } = props
  return (
    <div className="col-lg-12">
      <h1 className="my-4">Sources</h1>
      <div className="form-check">
        {sources.map(source => <SourceCard key={source.id} source={source} />)}
        <button type="submit" onSubmit={handleSubmit}>
          Add Sources
        </button>
      </div>
    </div>
  )
}

export default SourcesList
