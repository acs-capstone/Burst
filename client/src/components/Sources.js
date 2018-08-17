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
      userSources: [],
      prevSources: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchSources()
    if (this.props.user.sources.length) {
      this.setState({
        userSources: [],
        prevSources: true
      })
    }
  }

  // componentDidUpdate() {
  //   this.setState({ userSources: this.props.user.sources })
  // }

  handleClick(source) {
    if (this.state.userSources.includes(source)) {
      this.setState({
        userSources: this.state.userSources.filter(src => src.id !== source.id)
      })
    } else this.setState({ userSources: [...this.state.userSources, source] })

    console.log(this.state.userSources)
  }

  handleSubmit() {
    const userSources = this.state.userSources
    const userPrefObj = {
      userId: this.props.user.id,
      arrayOfSources: userSources
    }

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
        handleClick={this.handleClick}
        handleSubmit={this.handleSubmit}
        sources={this.props.sources}
        userSources={this.state.userSources.map(source => source.id) || []}
      />
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    sources: state.sources,
    userSources: state.user.sources
  }
}

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
