export class MockPromise {
    constructor(isResolved, data) {
        this.isResolved = isResolved;
        this.data = data;
    }

    then(success, error) {
        const handler = this.isResolved ? success : error;
        return new MockPromise(this.isResolved, handler(this.data));
    }
}
