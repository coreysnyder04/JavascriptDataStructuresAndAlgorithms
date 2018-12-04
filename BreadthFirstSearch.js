const {createQueue} = require('./Queue.js');

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
      return nodes
      .map(({neighbors, key}) => {
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
    breadthFirstSearch(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey);

      const visited = nodes.reduce((acc = [], node) => {
        acc[node.key] = false;
        return acc;
      });

      const queue = createQueue();
      queue.add(startingNode);

      while (!queue.isEmpty()) {
        const currentNode = queue.dequeue();

        if (!visited[currentNode.key]) {
          visitFn(currentNode);
          visited[currentNode.key] = true; // Set it to visited
        }

        currentNode.neighbors.forEach((node => {
          if (!visited[node.key]) {
            queue.add(node);
          }
        }));
      }
    }
  }
}



const graph = createGraph(true);

graph.addNode('a');
graph.addNode('b');
graph.addNode('c');
graph.addNode('d');
graph.addNode('e');
graph.addNode('f');

const edges = [
  ['a', 'b'],
  ['a', 'e'],
  ['a', 'f'],
  ['b', 'd'],
  ['b', 'e'],
  ['c', 'b'],
  ['d', 'c'],
  ['d', 'e'],
];


edges.forEach( (nodes) => {
  graph.addEdge(...nodes);
});


graph.print();

console.log('###### Breadth First Search Result ######');
graph.breadthFirstSearch('a', (node) => {
  console.log(node.key);
});