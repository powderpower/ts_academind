interface Named {
    readonly name: string;

    /**
     * Такая конструкция ?: значит, что проперти
     * может существовать, может не существовать.
     * (не понятно зачем это в интерфейсе)
     */
    outputName?: string;
}

interface Aged {
    readonly age: number;
}

interface Greetable extends Named, Aged
{
    greet(phrase: string): void;
}

/**
 * Пример удовлетворения объекта интерфейсу.
 */
let user1: Person;

user1 = {
    name: 'Andy',
    age: 26,
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
};

user1.greet('Hi there I am');

/**
 * Пример удовлетворения класса интерфейсу.
 */

class Person implements Greetable
{
    public name: string;
    public age: number;
    
    public constructor(name:string, age: number = 26)
    {
        this.name = name;
        this.age = age;
    }

    public greet(phrase: string) {
        console.log(phrase + ' ' + this.name + ' and I am ' + this.age + ' years old');
    }
}

const user2 = new Person('Andy-2');

user2.greet('Hi there I am');

/**
 * Типы функций черех интерфейсы (странная штука).
 */
// type AddFn = (a: number, b: number) => number;

interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (a: number, b: number): number => {
    return a + b;
};