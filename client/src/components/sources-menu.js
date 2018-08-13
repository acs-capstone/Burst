import React, { Component } from 'react'
import { getSourcesList } from '../store/allSources'
import { connect } from 'react-redux'

class SourcesMenu extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     currentSource: '',
  //     selectedSources: []
  //   }
  //   this.handleClick = this.handleClick.bind(this)
  //   this.handleChange = this.handleChange.bind(this)
  // }
  async componentDidMount(evt) {
    try {
      await this.props.getSourcesList()
      console.log('STORE SOURCES', this.props.allSources)
    } catch (err) {
      console.error(err.message)
    }
  }

  // handleClick(evt) {
  //   this.setState({
  //     selectedSources: [...this.state.sources, this.state.currentSource]
  //   })
  // }

  // handleChange(evt) {
  //   this.setState({
  //     currentSource: evt.target.value,
  //     currentSourceName: evt.target.name
  //   })
  // }

  render() {
    console.log('PROPS_SOURCES', this.props.sourceNames)
    return (
      <div>
        <div>
          <label htmlFor="sources-menu">Sources:</label>
          <select onChange={this.props.handleChange}>
            <option defaultValue="selected"> Please Select A Source </option>
            {this.props.allSources.map(source => {
              return (
                <option name={source.name} value={source.id}>
                  {source.name}
                </option>
              )
            })}
          </select>
          <button onClick={this.props.handleClick} name="add-source">
            Add Source
          </button>
        </div>
        <div>
          {this.props.source.map(source => {
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
