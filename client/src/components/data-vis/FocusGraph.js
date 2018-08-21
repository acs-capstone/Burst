import React, { Component } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import links from './links0.json'
import nodes from './nodes0.json'
import ReactTooltip from 'react-tooltip'
import FocusGraphPreview from './FocusGraphPreview.js'

const data = {
  links,
  nodes
}
console.log(data)

class FocusGraph extends Component {
  constructor() {
    super()

    this.state = {
      activeNode: {}
    }
  }

  first = 0
  _handleNodeHover = (node, prevNode) => {
    if (this.first < 4) {
      console.log(
        'HOVER: ',
        'state:',
        this.state,
        'node:',
        node,
        'prevNode: ',
        prevNode
      )
      this.first++
    }
  }
  _handleNodeClick = node => {
    console.log('CLICKED!\n', 'state:', this.state, '\n', 'node:', node)
    if (node.nodeKey === this.state.activeNode.nodeKey) {
      this.setState({ activeNode: {} })
    }
    // Aim at node from outside it
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
    this.setState({ activeNode: node })
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
          onNodeClick={this._handleNodeClick}
          onNodeHover={this._handleNodeHover}
        />

        {this.state.activeNode.id ? (
          <FocusGraphPreview node={this.state.activeNode} />
        ) : (
          <div />
        )}
        <ReactTooltip />
      </div>
    )
  }
}

export default FocusGraph
