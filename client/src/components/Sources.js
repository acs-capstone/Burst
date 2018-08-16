import React, { Component } from 'react'
import SourcesMenu from './sources-menu'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router'
import SourcesList from './SourcesList'
import { getAllSources, updateUserThunk } from '../store'

class SourcesContainer extends Component {
  constructor() {
    super()
    this.state = {
      prevSources: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchSources()
    if (this.props.user.sources.length) {
      this.setState({ prevSources: true })
    }
  }

  handleSubmit() {
    const userSources = this.props.sources
      .filter(source => source.selected === true)
      .map(source => {
        return source.id
      })
    console.log(userSources)
    const userPrefObj = {
      userId: this.props.user.id,
      arrayOfSources: userSources
    }

    console.log(userPrefObj)
    this.props.setUserSources(userPrefObj)
    if (this.state.prevSources) {
      this.props.history.push('/home')
    }
  }
  render() {
    return !this.props.sources ? (
      <div>loading</div>
    ) : (
      <SourcesList
        handleSubmit={this.handleSubmit}
        sources={this.props.sources.slice(2, 10)}
      />
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
    setUserSources: userPrefObj => {
      dispatch(updateUserThunk(userPrefObj))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(SourcesContainer)
