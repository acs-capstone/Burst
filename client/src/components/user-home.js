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
      <h3>Welcome, {user.email}</h3>
      <div>
        <div>
          <Card>
            <CardContent>
              <div className="top-card-container">
                <Typography gutterBottom variant="headline" component="h2">
                  Your Political Orientation is: {user.poliOri.poliOri}
                </Typography>{' '}
                <Button>
                  <Link to="/questions">Retake Quiz</Link>
                </Button>
              </div>
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
      </div>
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
