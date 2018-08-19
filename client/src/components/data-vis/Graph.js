import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ForceGraph2D } from 'react-force-graph'
import links from './links.json'
import nodes from './nodes.json'

const onNodeHover = (node, prevNode) => {
  console.log('HOVER: ', 'node:', node, 'prevNode: ', prevNode)
}

const onNodeClick = node => {
  console.log('CLICK:', 'node:', node)
}

const initialState = { data: {} }

class Graph extends Component {
  componentDidMount() {
    this.props.fetchGraphData()
  }
  render() {
    return (
      <div>
        Graph
        <ForceGraph2D
          graphData={this.props.data}
          nodeLabel="Article Title"
          onNodeHover={onNodeHover}
          onNodeClick={onNodeClick}
          d3Force
        />
      </div>
    )
  }
}

const mapState = state => {
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

  return {
    user: state.user,
    data: data
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGraphData: () => {
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
      return data
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Graph)
