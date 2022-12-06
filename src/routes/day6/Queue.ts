export class FixedLengthQueue<T> {
    queue: T[] = [];
    private readonly maxLength: number;

    constructor(maxLength: number) {
        this.maxLength = maxLength;
    }

    enqueue(value: T) {
        if (this.queue.length == this.maxLength) {
            this.queue.shift();
        }
        this.queue.push(value);
    }

    dequeue(): T | undefined {
        return this.queue.shift();
    }

    clear() {
        this.queue = []
    }

    contains(value: T) {
        return this.queue.includes(value)
    }

    get isFull() {
        return this.queue.length === this.maxLength;
    }

    isUnique() {
        return new Set(this.queue).size === this.queue.length;
    }
}