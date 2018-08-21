import React, { Component } from 'react'

class FocusGraphPreview extends Component {
  componentDidMount() {
    console.log('focus graph preview this.el', this.el)
  }
  render() {
    const { node } = this.props
    return (
      <div
        ref={el => {
          this.el = el
        }}
        id="graph-preview"
        className="card"
      >
        <div className="card-header">
          <button type="button" onClick={() => console.log(node)}>
            click
          </button>
          <p>{node.title}</p>
        </div>
        <div className="card-body">
          <img src={node.imageUrl} />
          <p>{node.desc}</p>
          <p>{node.publishedAt}</p>
        </div>
      </div>
    )
  }
}
export default FocusGraphPreview
