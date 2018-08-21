import React from 'react'
import { ForceGraph3D } from 'react-force-graph'
import links from './links0.json'
import nodes from './nodes0.json'

const data = {
    links,
    nodes
}
console.log(data)

class FocusGraph extends React.Component {
    _handleHover = (node, prevNode) => {
        console.log('HOVER: ', 'node:', node, 'prevNode: ', prevNode)
    }
    _handleClick = node => {
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
    }
    render() {
        return (
            <ForceGraph3D
                ref={el => {
                    this.fg = el
                }}
                graphData={data}
                nodeLabel="label"
                nodeAutoColorBy="group"
                onNodeClick={this._handleClick}
                onNodeHover={this._handleHover}
            />
        )
    }
}

export default FocusGraph
