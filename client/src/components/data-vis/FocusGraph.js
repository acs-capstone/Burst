import React, { Component } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import links from './links0.json'
import nodes from './nodes0.json'
//import ReactTooltip from 'react-tooltip'
import FocusGraphPreview from './FocusGraphPreview'

const data = {
  links,
  nodes
}
console.log(data)

class FocusGraph extends Component {
  constructor() {
    super()

    this.state = {
      activeNode: {},
      showPreview: false
    }
  }
  _handleHover = (node, prevNode) => {
    console.log('HOVER: ', 'node:', node, 'prevNode: ', prevNode)
  }
  _handleClick = node => {
    // Aim at node from outside it
    if (node === null) {
      this.setState({ showPreview: false })
    }
    const distance = 40
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)
    this.fg.cameraPosition(
      {
        x: node.x * distRatio,
        y: node.y * distRatio,
        z: node.z * distRatio
      }, // new position
      node, // lookAt ({ x, y, z })
      3000 // ms transition duration
    )
    this.setState({ activeNode: node, showPreview: true })
  }

  render() {
    return (
      <div className="focusGraph">
        <ForceGraph3D
          ref={el => {
            this.fg = el
          }}
          graphData={data}
          nodeLabel="title"
          nodeAutoColorBy="group"
          onNodeClick={this._handleClick}
          onNodeHover={this._handleHover}
        />
        <FocusGraphPreview node={this.state.activeNode} />
      </div>
    )
  }
}

export default FocusGraph
