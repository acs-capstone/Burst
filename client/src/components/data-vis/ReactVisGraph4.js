import React from 'react'
import { ForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force'

const Graph = () => {
  return (
    <ForceGraph simulationOptions={{ height: 300, width: 300 }}>
      <ForceGraphNode key="1" node={{ id: 'first-node' }} fill="red" />
      <ForceGraphNode key="2" node={{ id: 'second-node' }} fill="blue" />
      <ForceGraphLink
        key="1"
        link={{ source: 'first-node', target: 'second-node' }}
      />
    </ForceGraph>
  )
}

export default Graph
