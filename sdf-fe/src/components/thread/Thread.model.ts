class Thread {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public isActive: boolean = true
    ) {}

    deactivate() {
        this.isActive = false;
    }

    greet() {
        return `Hello, my name is ${this.name}`;
    }
}

// Example usage:
const user1 = new User(1, "Barry Wilson", "barry@example.com");
console.log(user1.greet()); // "Hello, my name is Barry Wilson"
user1.deactivate();
console.log(user1.isActive); // false
