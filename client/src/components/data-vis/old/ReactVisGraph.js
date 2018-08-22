import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink
} from 'react-vis-force'
import links from './links.json'
import nodes from './nodes.json'
const data = {
  links,
  nodes: nodes.concat([
    { id: 'id6', key: 6, name: 'id6', val: 5, color: '#d1d1d1' },
    { id: 'id7', key: 7, name: 'id7', val: 5, color: '#d1d1d1' },
    { id: 'id8', key: 8, name: 'id8', val: 5, color: '#d1d1d1' },
    { id: 'id9', key: 9, name: 'id9', val: 5, color: '#d1d1d1' },
    { id: 'id10', key: 10, name: 'id10', val: 5, color: '#d1d1d1' }
  ])
}

console.log(data)
const onNodeHover = (node, prevNode) => {
  console.log('HOVER: ', 'node:', node, 'prevNode: ', prevNode)
}

const onNodeClick = node => {
  console.log('CLICK:', 'node:', node)
}

const initialState = { data: {} }

class ReactVisGraph extends Component {
  constructor() {
    super()
    this.state = { data: data }
  }
  componentDidMount() {
    this.props.fetchGraphData()
  }

  render() {
    console.log('this.state:', this.state)
    return (
      <div id="graph">
        <h1>Graph</h1>
        <InteractiveForceGraph
          simulationOptions={{ height: 900, width: 900 }}
          labelAttr="label"
          onSelectNode={node => console.log(node)}
          highlightDependencies
        >
          {nodes.map(node => (
            <ForceGraphNode
              key={node.key}
              node={{ id: node.id, label: node.label }}
              fill={node.color}
            />
          ))}

          {links.map(link => (
            <ForceGraphLink
              key={link.key}
              link={{ source: link.source, target: link.target }}
            />
          ))}
        </InteractiveForceGraph>
      </div>
    )
  }
}

// const mapState = state => {
//   const data = {
//     links,
//     nodes: nodes.concat([
//       { id: 'id6', key: 6, name: 'id6', val: 5, color: '#d1d1d1' },
//       { id: 'id7', key: 7, name: 'id7', val: 5, color: '#d1d1d1' },
//       { id: 'id8', key: 8, name: 'id8', val: 5, color: '#d1d1d1' },
//       { id: 'id9', key: 9, name: 'id9', val: 5, color: '#d1d1d1' },
//       { id: 'id10', key: 10, name: 'id10', val: 5, color: '#d1d1d1' }
//     ])
//   }
//
//   return {
//     user: state.user,
//     data: data
//   }
// }
//
// const mapDispatch = dispatch => {
//   return {
//     fetchGraphData: () => {
//       const data = {
//         links,
//         nodes: nodes.concat([
//           { id: 'id6', key: 6, name: 'id6', val: 5, color: '#d1d1d1' },
//           { id: 'id7', key: 7, name: 'id7', val: 5, color: '#d1d1d1' },
//           { id: 'id8', key: 8, name: 'id8', val: 5, color: '#d1d1d1' },
//           { id: 'id9', key: 9, name: 'id9', val: 5, color: '#d1d1d1' },
//           { id: 'id10', key: 10, name: 'id10', val: 5, color: '#d1d1d1' }
//         ])
//       }
//       return data
//     }
//   }
// }

// export default connect(
//   mapState,
//   mapDispatch
// )(Graph)

export default ReactVisGraph
