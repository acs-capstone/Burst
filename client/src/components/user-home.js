import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

/* COMPONENT */

export const UserHome = props => {
  const { user } = props
  console.log('user.topcs', user.topics)
  return (
    <div>
      <h3>
        Welcome, {user.email}
        !!!!!!
      </h3>
      <div>
        <div>
          <h5>Update Preferences</h5>
          <h4>{`Your Political Orientation Score is ${
            user.poliOri.poliOri
          }`}</h4>
          <Link to="/questions">Retake Quiz</Link>
        </div>
        <div>
          <Card>
            <CardContent>
              <div className="top-card-container">
                <Typography gutterBottom variant="headline" component="h2">
                  Current Topics
                </Typography>{' '}
                <Button>
                  <Link to="/topics">Update Topics</Link>
                </Button>
              </div>
              {/* <Link to="/topics">Update Topics</Link> */}
              <div className="chip-container">
                {user.topics.map(topic => {
                  return <Chip label={topic.name} />
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h4>Current Sources</h4>
          <div className="chip-container">
            {user.sources.map(source => {
              return <Chip label={source.name} />
            })}
          </div>
          <Link to="/sources">Update Sources</Link>
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
