import React from 'react'
import history from '../history'

const Feedback = props => {
  return (
    <div>
      <h3>Rate Your Experience</h3>

      <button onClick={() => history.push('/news')}>
        <img src="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi13uLFxIHdAhWvUt8KHcIKAc4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F495634%2Fapprove_facebook_favorite_like_thumbs_up_vote_icon&psig=AOvVaw3DqlC_PcgrsmdlJ3cMpguh&ust=1535057384235204" />
      </button>
      <button onClick={() => history.push('/news')}> Thumbs Up</button>
    </div>
  )
}

export default Feedback
