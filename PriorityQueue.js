const {createQueue} = require('./Queue.js');

function createPriorityQueue(){
  let lowPriority = createQueue();
  let highPriority = createQueue();

  return {
    add(item, isHighPriority = false){
      isHighPriority
        ? highPriority.add(item)
        : lowPriority.add(item);
    },
    dequeue(){
      return !highPriority.isEmpty()
        ? highPriority.dequeue()
        : lowPriority.dequeue();
    },
    peek(){
      return !highPriority.isEmpty()
        ? highPriority.peek()
        : lowPriority.peek();
    },
    get length() {
      return highPriority.length + lowPriority.length;
    },
    isEmpty(){
      return highPriority.length === 0 && lowPriority.length ===0;
    }
  };
}

var q = createPriorityQueue();

q.add('highPriority1', true);
q.add('highPriority2', true);
q.add('lowPriority1', true);
q.add('lowPriority2');

console.log(q.peek(), q.length);
console.log(q.length, q.dequeue());
console.log(q.length, q.dequeue());
console.log(q.length, q.dequeue());
console.log(q.length, q.dequeue());

module.exports.createPriorityQueue = createPriorityQueue;