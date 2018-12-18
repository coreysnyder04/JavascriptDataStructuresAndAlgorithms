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

      const queue = createQueue(); // Create a new Queue
      queue.add(startingNode); // Add our starting node to kick us off

      while (!queue.isEmpty()) {
        // While our Queue is not empty
        const currentNode = queue.dequeue(); // Pull out the next node in the queue


        if (!visited[currentNode.key]) { // If we haven't already crawled this node
          visitFn(currentNode); // Run our visit function callback on given the node
          visited[currentNode.key] = true; // Set it to visited
        }

        // Now we need to queue up all of this nodes neighbors/edges to be crawled
        currentNode.neighbors.forEach((node => { // Loop over all neighbor nodes
          if (!visited[node.key]) { // If we haven't already crawled this node
            queue.add(node); // Queue it up
          }
        }));
      }
    },

    depthFirstSearch(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey);
      const visited = nodes.reduce((acc, cur) => {
        acc[cur.key] = false;
        return acc;
      }, {})

      function explore(node){

        if (!visited[node.key]) { // If we haven't already crawled this node
          visitFn(node); // Run our visit function callback on given the node
          visited[node.key] = true; // Set it to visited

          node.neighbors.forEach( (node) => {
            explore(node);
          });
        }
      }
      explore(startingNode);
    }
  };
}



const graph = createGraph(true);

graph.addNode('a');
graph.addNode('b');
graph.addNode('c');
graph.addNode('d');
graph.addNode('e');
graph.addNode('f');
graph.addNode('g');

const edges = [
  ['a', 'b'],
  ['a', 'e'],
  ['a', 'f'],
  ['b', 'd'],
  ['b', 'g'],
  ['b', 'e'],
  ['c', 'b'],
  ['d', 'c'],
  ['d', 'e'],
];

/*
a
b
d
c
e


 */


edges.forEach( (nodes) => {
  graph.addEdge(...nodes);
});


graph.print();

console.log('###### Breadth First Search Result ######');
graph.breadthFirstSearch('a', (node) => {
  console.log(node.key);
});

console.log('###### Dept First Search Result ######');
graph.depthFirstSearch('a', (node) => {
  console.log(node.key);
});