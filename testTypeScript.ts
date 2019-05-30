// Typescript example to set type of variable to "string" type.
let message: string = "Hello World";
console.log(message);

function greeter(person: string) {
    return "Hello, " + person;
}

let user: string = "Jane User";
console.log(greeter(user));
