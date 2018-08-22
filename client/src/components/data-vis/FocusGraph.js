import React, { Component } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import links from './links.json'
import nodes from './nodes.json'
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

    this.containerRef = React.createRef()

    this.state = {
      activeNode: {},
      topicNodes: []
    }
  }

  first = 0
  _handleNodeHover = (node, prevNode) => {
    console.log(
      'HOVER: ',
      'state:',
      this.state,
      'node:',
      node,
      'prevNode: ',
      prevNode
    )
  }
  _handleNodeClick = node => {
    const MAP_TIME = 3000

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
      MAP_TIME // ms transition duration
    )

    setTimeout(() => {
      this.setState({ activeNode: node })
    }, (2 * MAP_TIME) / 3)
  }

  handleClose = () => {
    console.log('close this window!')
  }

  render() {
    console.log('this.state: ', this.state)
    return (
      <div className="focus-graph">
        <ForceGraph3D
          ref={el => {
            this.fg = el
          }}
          graphData={data}
          nodeLabel="title"
          nodeAutoColorBy="group"
          // width={800}
          // height={600}
          onNodeClick={this._handleNodeClick}
          onNodeHover={this._handleNodeHover}
          onClose={this.handleClose}
        />
        <FocusGraphPreview node={this.state.activeNode} />
        )}
      </div>
    )
  }
}

export default FocusGraph
