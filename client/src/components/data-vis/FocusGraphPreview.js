import React, { Component } from 'react'

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
            <button className="btn" type="button">
              Read Article
            </button>
          </a>
          <button
            className="btn"
            type="button"
            onClick={() => handleClose(node)}
          >
            Close
          </button>
        </div>
      </div>
    )
  }
}
export default FocusGraphPreview

// <div className="preview-intro">
// <h3> Choose a topic to explore</h3>
// </div>
// ) : (
// <div id="data-pop-up">
// <Grid container>
//   <Grid item xs={4}>
//     <Card>
//       <CardHeader
//         title={
//           <a href={node.url} target="_blank">
//             {' '}
//             {node.title}{' '}
//           </a>
//         }
//         subheader={`${node.source.name} | published at: ${
//           node.publishedAt
//         }`}
//       />

//       <CardContent>
//         {node.urlToImage ? (
//           <CardMedia
//             style={{ height: 0, paddingTop: '56.25%' }}
//             image={node.urlToImage}
//             title={node.title}
//           />
//         ) : null}
//         <Typography component="p">{node.desc}</Typography>
//       </CardContent>
//     </Card>
//   </Grid>
// </Grid>
// </div>
