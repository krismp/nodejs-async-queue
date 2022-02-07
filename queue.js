const EventEmitter = require("events");

class AsyncQueue extends EventEmitter {
    constructor() {
        super();
        this.queue = [];
        this.currentInterval = 250;
        this.isPaused = false;
        this.interval = null;
    }

    enqueue(item) {
        this.queue.push(item);
        this.emit("enqueued", item);
    }

    peek() {
        return this.queue[0];
    }

    print() {
        return this.queue;
    }

    getCurrentInterval() {
        return this.currentInterval;
    }

    start() {
        this.interval = setInterval(() => {
            if (this.isPaused) {
                clearInterval(this.interval);
            } else {
                if (this.queue.length > 0) {
                    const removedItem = this.queue.shift();
                    this.emit("dequeued", removedItem);
                }
            }
        }, this.currentInterval);
    }

    changeInterval(intervalTime) {
        this.currentInterval = intervalTime;
    }

    pause() {
        this.isPaused = true;
    }
}

module.exports = AsyncQueue;