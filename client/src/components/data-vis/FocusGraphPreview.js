import React, { Component } from 'react'

class FocusGraphPreview extends Component {
  componentDidMount() { }

  render() {
    const { node, handleClose } = this.props
    console.log('THIS.PROPS:', this.props)
    console.log('PREVIEW NODE: ', node)
    console.log('HANDLE CLOSE:', handleClose)
    return !node.id ? (
      <div className="page-header">
        <h4>Visualize Articles By Topic</h4>
      </div>
    ) : (
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

            <a href={node.url} target="_blank" rel="noopener noreferrer">
              <button className="btn" type="button">
                Read Article
            </button>
            </a>
            <button
              className="btn"
              type="button"
              onClick={() => handleClose(node)}
            >
              close
          </button>
          </div>
        </div>
      )
  }
}
export default FocusGraphPreview
