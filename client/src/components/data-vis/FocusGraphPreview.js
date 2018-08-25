import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class FocusGraphPreview extends Component {
  componentDidMount() {}

  render() {
    const { node, handleClose } = this.props
    return !node.id ? (
      <div className="preview-intro">
        <h4>Choose a topic to visualize</h4>
      </div>
    ) : (
      <div
        ref={el => {
          this.el = el
        }}
        className="graph-preview"
      >
        <div className="card-header">
          <img
            className="card-img-top"
            alt={node.title}
            src={node.urlToImage}
          />

          <h4>{node.title}</h4>
          {/* </div>
        <div className="card-body"> */}
          <p>{node.desc}</p>

          <a href={node.url} target="_blank" rel="noopener noreferrer">
            <button className="btn ml-4" type="button">
              READ ARTICLE
            </button>
          </a>

          <button
            className="btn ml-4"
            type="button"
            onClick={() => handleClose(node)}
          >
            CLOSE
          </button>
        </div>
      </div>
    )
  }
}
export default FocusGraphPreview
