import React from 'react'
import SourceCard from './SourceCard'

// GOALS
// List top 10 news sources (currently just listing the top alphabetically)
// Allow them to search for additional sources (this would look terrible as
// just a list though, but I think there should be a way to fix, e.g. look at
// what feedly does)

const SourcesList = props => {
  const { userSources, sources, handleClick, handleSubmit } = props

  return (
    <div className="col-lg-12">
      <h1 className="my-4">Sources</h1>
      <div className="card-columns">
        {sources.map(source => {
          return (
            <SourceCard
              key={source.id}
              source={source}
              handleClick={handleClick}
              selected={userSources.includes(source.id) ? true : false}
            />
          )
        })}
        <button type="submit" onClick={handleSubmit}>
          Add Sources
        </button>
      </div>
    </div>
  )
}

export default SourcesList
