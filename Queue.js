function createQueue() {
  let queue = [];

  return {
    add(item){
      queue.unshift(item);
    },
    dequeue(){
      return queue.pop();
    },
    peek(){
      return queue[queue.length -1];
    },
    get length() {
      return queue.length
    },
    isEmpty(){
      return queue.length === 0;
    }
  };
}


var newQueue = createQueue();

newQueue.add("Step 1");
newQueue.add("Step 2");
newQueue.add("Step 3");

console.log(newQueue.peek(), newQueue.length, newQueue.isEmpty());
// Step 1, 3, false

newQueue.dequeue();

console.log(newQueue.peek(), newQueue.length, newQueue.isEmpty());
// Step 2, 2, false

newQueue.dequeue();
newQueue.dequeue();

console.log(newQueue.peek(), newQueue.length, newQueue.isEmpty());
// undefined, 0, true

module.exports.createQueue = createQueue;
