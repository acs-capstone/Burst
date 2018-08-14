import React, { Component } from 'react'
import { getSourcesList } from '../store/allSources'
import { connect } from 'react-redux'

class SourcesMenu extends Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
  }
  async componentDidMount(evt) {
    try {
      await this.props.getSourcesList()
      console.log('STORE SOURCES', this.props.allSources)
    } catch (err) {
      console.error(err.message)
    }
  }

  handleChange(evt) {
    this.setState({ selected: evt.target.value })
  }

  render() {
    console.log('PROPS_SOURCES', this.props.sourceNames)
    return (
      <div>
        <div>
          <form onSubmit={this.props.handleSubmit}>
            <label htmlFor="sources-menu">Sources:</label>
            <select onChange={this.handleChange}>
              <option defaultValue="selected"> Please Select A Source </option>
              {this.props.allSources.map(source => {
                return (
                  <option value={source.name} id={source.id}>
                    {source.name}
                  </option>
                )
              })}
            </select>
            <button
              type="submit"
              onClick={this.props.handleClick}
              name="add-source"
              value={this.state.selected}
            >
              Add Source
            </button>
          </form>
        </div>
        <div>
          {this.props.sourceNames.map(source => {
            return <h3>{source}</h3>
          })}
        </div>
        <button onClick={this.props.handleClick} type="submit" name="submit">
          Submit
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  allSources: state.allSources
})

const mapDispatch = dispatch => {
  return {
    getSourcesList: () => dispatch(getSourcesList())
  }
}

export default connect(
  mapState,
  mapDispatch
)(SourcesMenu)
//need a handle change that keeps track of selected sources + need option to select more than one source
