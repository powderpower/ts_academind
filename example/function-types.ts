function add(n1: number, n2: number): number {
    return  n1 + n2;
}

function printResult(num: number): void {
    console.log('Result: ' + num);
    // return; - если хочется типизировать ретурн как : undefined
}

printResult(add(5,12));

/**
 * Определение типа функции.
 */
// let combineValues: Function;

/**
 * Определение, что переменная должна быть функцией,
 * которая не берет аргументов, или берет, и возвращает число.
 */
let combineValues: (a: number, b: number) => number;

combineValues = add;

/**
 * Когда определены типы функции перменной,
 * то так уже нельзя, потому что функция не соответствует спеецфикации.
 */
//combineValues = printResult;

console.log(combineValues(8, 8));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;

    cb(result);
}

addAndHandle(10, 20, (result) => { console.log(result); });