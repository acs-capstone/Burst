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
        className="card graph-preview"
      >
        <div className="card-header">
          <img
            className="card-img-top"
            alt={node.title}
            src={node.urlToImage}
          />
          <h4>{node.title}</h4>
        </div>
        <div className="card-body">
          <p>{node.desc}</p>
          <p>Published: {node.publishedAt}</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => console.log(node)}
          >
            close
          </button>
        </div>
      </div>
    )
  }
}
export default FocusGraphPreview
