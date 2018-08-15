import React, { Component } from 'react'
import SourcesMenu from './sources-menu'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router'
import SourcesList from './SourcesList'
import { getAllSources, setUserSources } from '../store'

class SourcesContainer extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log(this.props)
    this.props.fetchSources()
  }

  handleSubmit() {
    const userSources = this.props.sources.filter(
      source => source.selected === true
    )
    console.log(userSources)
    //this.props.setUserSources(userSources)
  }
  render() {
    return !this.props.sources ? (
      <div>loading</div>
    ) : (
      <SourcesList sources={this.props.sources.slice(2, 10)} />
    )
  }
}

const mapState = state => ({
  user: state.user,
  sources: state.sources
})

const mapDispatch = dispatch => {
  return {
    fetchSources: () => {
      dispatch(getAllSources())
    },
    setUserSources: userSources => {
      console.log(userSources)
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(SourcesContainer)
