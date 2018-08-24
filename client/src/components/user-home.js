import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'


/* COMPONENT */

export const UserHome = props => {
  const { user } = props
  return (
    <div>

      <div className="page-header-item">
        <h3>Welcome, {user.email}</h3>
      </div>

      <div className="page-header-item">
        <h4>How would you like to burst your bubble?</h4>
      </div>

      <div className="page-header-item">
        <button className="home-burst-options">
          <Link to="/news">Browse</Link>
        </button>
        <button className="home-burst-options">
          <Link to="/popular">Discuss</Link>
        </button>
        <button className="home-burst-options">
          <Link to="/explore">Visualize</Link>
        </button>
      </div>

      <Card>
        <CardContent>

          <div className="top-card-container">
            <Typography gutterBottom variant="headline" component="h2">
              Your Political Orientation is:
                </Typography>{' '}
          </div>

          <div className="chip-container">
            <button className="profile-selections" >{user.poliOri.poliOri}</button>
          </div>

          <Button>
            <Link to="/questions">Retake Quiz</Link>
          </Button>

          <Divider />


          <div className="top-card-container">
            <Typography gutterBottom variant="headline" component="h2">
              Your Topics
            </Typography>{' '}
          </div>

          <div className="chip-container">
            {user.topics.map(topic => {
              return (
                <button className="profile-selections" key={topic.id}>{topic.name}</button>
              )
            })}
          </div>

          <Button>
            <Link to="/topics">Update Topics</Link>
          </Button>

          <Divider />


          <div className="top-card-container">
            <Typography gutterBottom variant="headline" component="h2">
              Your Sources
                </Typography>{' '}
          </div>

          <div className="chip-container">
            {user.sources.map(source => {
              return (
                <button className="profile-selections" key={source.id}>{source.name}</button>
              )
            })}
          </div>

          <Button>
            <Link to="/sources">Update Sources</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

/* CONTAINER */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)
