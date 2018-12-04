function createNode(key) {
  const neighbors = [];

  return {
    key,
    neighbors,
    addNeighbor(node) {
      neighbors.push(node);
    }
  };
}

function createGraph(directed = false) {
  const nodes = [];
  const edges = [];

  return {
    directed,
    nodes,
    edges,

    addNode(key) {
      nodes.push(createNode(key));
    },

    getNode(key) {
      return nodes.find(node => node.key === key);
    },

    addEdge(node1Key, node2Key) {
      const node1 = this.getNode(node1Key);
      const node2 = this.getNode(node2Key);

      node1.addNeighbor(node2);
      edges.push(`${node1Key}${node2Key}`);

      if (!directed) {
        node2.addNeighbor(node1);
      }
    },

    print() {
      console.log('nodes', nodes);
      return nodes
      .map(({ neighbors, key }) => {
        let result = `${key}`;

        if (neighbors.length) {
          result += ` => ${neighbors
          .map(node => node.key)
          .join(' ')}`;
        }

        return result;
      })
      .join('\n');
    },
  };
}

const graph = createGraph(true);

graph.addNode('Corey');
graph.addNode('Kayleigh');
graph.addNode('Daisy');


graph.addEdge('Kayleigh', 'Corey');
graph.addEdge('Corey', 'Kayleigh');
graph.addEdge('Kayleigh', 'Daisy');
graph.addEdge('Corey', 'Daisy');
graph.addEdge('Daisy', 'Kayleigh');


console.log(graph.print());

module.exports.createGraph = createGraph;