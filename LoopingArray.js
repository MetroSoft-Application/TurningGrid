class LoopingArray {
    constructor(arr) {
        this.array = arr;
    }

    get(index) {
        const newIndex = index % this.array.length;
        return this.array[newIndex];
    }
}