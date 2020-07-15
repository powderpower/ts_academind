/**
 * Какая фича где поддерживается
 * https://kangax.github.io/compat-table/es6/
 */

/** == arrow functions == */

const something: any[] = [1, 'two', 3]; // тип массива с любыми значениями.

const add = (a: number, b: number = 1) => a + b;

const printOutput: (a: number | string) => void = output => console.log();

console.log(printOutput(add(5)));

const button = document.querySelector('button');

if (button instanceof HTMLButtonElement) {
    button.addEventListener('click', event => console.log(event));
}

const hobbies = ['Sports', 'Cooking'];

const activeHobbies = ['Hiking'];

/**
 * SpreadOperator
 */
activeHobbies.push(...hobbies);

const person = {
    name: 'Max',
    age: 30,
};

const copiedPerson = { ...person };

const newAdd = (
        ...numbers: number[]
        /** или ...numbers: number[number, number, number] */
    ) => {

    let result = 0;
    numbers.reduce((curRes, curVal) => {
        return curRes + curVal
    }, 0)

}

const addedNumbers = newAdd(5, 10, 2, 3.7);

/**
 * Destructors
 */
const someArray = ['Sports', 'Cooking', 'Hiking'];

const [hobby1, hobby2] = someArray;
/** на выходе будет
 * const hobby1 = 'Sports';
 * const hobby2 = 'Cooking';
 */

const anyPerson = {
    firstName: 'Max',
    age: 30,
};

// const { firstName, age } = anyPerson;
/**
 * или
 */
const { firstName: userName, age } = anyPerson;
/** здесь в переменную userName будет помещено значение firstName */