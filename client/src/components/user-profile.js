import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

/* COMPONENT */

export const UserProfile = props => {
  const { user } = props
  console.log('user.topcs', user.topics)
  return (
    <div>
      <Card>
        <CardContent>
          <div className="top-card-container">
            <Typography gutterBottom variant="headline" component="h2">
              Your Topics
            </Typography>{' '}
          </div>

          <div className="chip-container">
            {user.topics.map(topic => {
              return <Chip color="primary" label={topic.name} key={topic.id} />
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
              return <Chip color="primary" label={source.name} key={source.id} />
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

export default connect(mapState)(UserProfile)
