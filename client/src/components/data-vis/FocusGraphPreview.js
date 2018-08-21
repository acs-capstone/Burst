import React, { Component } from 'react'

class FocusGraphPreview extends Component {
  componentDidMount() {
    console.log(this)
  }
  render() {
    return (
      <div
        ref={el => {
          this.fg = el
        }}
        className="previewBaseClass"
      >
        <a href="/">Click here!</a>
      </div>
    )
  }
}

export default FocusGraphPreview
