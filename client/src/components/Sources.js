import React, { Component } from 'react'
import ChoiceButton from './choice-button2'
import { connect } from 'react-redux'
import { updateUserThunk, getAllSources } from '../store'

class Sources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sources: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount(evt) {
    const sourceIds = this.props.user.sources.map(source => {
      return source.id.toString()
    })
    await this.setState({
      sources: sourceIds
    }) //sets users sources to state if they have any already
    await this.props.fetchSources() //gets all sources
  }

  async handleClick(evt) {
    //checks if sources is already on state, if so add its to state, otherwise it removes it
    !this.state.sources.includes(evt.target.value)
      ? await this.setState({
          sources: [...this.state.sources, evt.target.value]
        })
      : await this.setState({
          sources: this.state.sources.filter(source => {
            return source !== evt.target.value
          })
        })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const userPrefObj = {
      userId: this.props.user.id,
      arrayOfSources: this.state.sources
    }
    this.props.updateUserThunk(userPrefObj)
    if (this.props.user.sources && this.props.history) {
      this.props.history.push('/home')
    }
  }

  render() {
    return (
      <div className="quiz-content-div">
        <h2>Which sources do you like to read?</h2>
        <div className="buttons-group">
          {this.props.sources.map(source => {
            return (
              <ChoiceButton
                key={source.id}
                source={source}
                handleClick={this.handleClick}
                selectedSources={this.state.sources}
              />
            )
          })}
        </div>
        {this.state.sources.length ? (
          <div>
            <button type="submit" name="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        ) : (
<<<<<<< HEAD
          <div>
            <button
              type="submit"
              name="submit"
              onClick={this.handleSubmit}
              disabled
            >
              Submit
            </button>
            <p>Please select at least one source.</p>
          </div>
        )}
      </div>
=======
            <div>
              <button type="submit" name="submit" onClick={this.handleSubmit} disabled>
                Submit
              </button>
              <p>Please select at least one source.</p>
            </div>
          )
        }
      </div >
>>>>>>> master
    )
  }
}

const mapState = state => ({
  user: state.user,
  sources: state.sources
})

const mapDispatch = dispatch => {
  return {
    fetchSources: () => dispatch(getAllSources()),
    updateUserThunk: user => dispatch(updateUserThunk(user))
  }
}

export default connect(
  mapState,
  mapDispatch
)(Sources)
