import React, { Component } from 'react'

export default class SourcesMenu extends Component {
  render() {
    return (
      <div>
        <label htmlFor="sources-menu">Sources:</label>
        <select name="sourceId">
          <option defaultValue="selected"> Please Select Sources </option>
          <option name="sourceId" value="new-york-times">
            New York Times
          </option>
        </select>
        <button onClick={props.handleClick} type="submit" name="submit">
          Submit
        </button>
      </div>
    )
  }
}

//need a handle change that keeps track of selected sources + need option to select more than one source
