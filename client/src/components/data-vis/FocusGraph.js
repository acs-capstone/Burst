import React, { Component } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import links from './links.json'
import nodes from './nodes.json'
import * as d3 from 'd3-force'
//import ReactTooltip from 'react-tooltip'
import FocusGraphPreview from './FocusGraphPreview.js'

const MAP_TIME = 3000
const DEFAULT_DISTANCE = 400
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
      topicNodes: data.nodes.filter(node => typeof node.id === 'string')
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    let distance = DEFAULT_DISTANCE
    this.fg.d3Force('center', null)
    this.fg.d3Force('charge', null)
    this.fg.d3Force(
      'strength',
      d3
        .forceManyBody()
        .strength(-30)
        .distanceMax(30)
        .distanceMin(10)
    )

    //this.fg.forceLinks('links', this.state.topicNodes)

    this.fg.cameraPosition({ z: distance })
    // // camera orbit
    // let angle = 0
    // setInterval(() => {
    //   this.fg.cameraPosition({
    //     x: distance * Math.sin(angle),
    //     z: distance * Math.cos(angle)
    //   })
    //   angle += Math.PI / 300
    // }, 10)
  }

  first = 0
  _handleNodeHover = (node, prevNode) => {
    // console.log(
    //   'HOVER: ',
    //   'state:',
    //   this.state,
    //   'node:',
    //   node,
    //   'prevNode: ',
    //   prevNode
    // )
  }

  _handleNodeClick = node => {
    console.log('CLICKED!\n', 'state:', this.state, '\n', 'node:', node)
    if (node.nodeKey === this.state.activeNode.nodeKey) {
      this.setState({ activeNode: {} })
    }
    // Aim at node from outside it
    const distance = 80
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

  handleClose(node) {
    console.log('close this window!')
    const distance = DEFAULT_DISTANCE
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

    this.setState({ activeNode: {} })
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
          width={1000}
          height={600}
          showNavInfo={false}
          onNodeClick={this._handleNodeClick}
          onNodeHover={this._handleNodeHover}
        />
        <FocusGraphPreview
          node={this.state.activeNode}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

export default FocusGraph
