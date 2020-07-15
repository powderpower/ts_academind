/**
 * Есть три основных типа данных
 * number - double, float - не существуют
 * string
 * boolean
 */

function add(n1: number, n2: number, needPrint: boolean, phrase: string) {
    // Для JS без TS
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //     throw new Error('Incorrect input');
    // }

    const result = n1 + n2;

    if (needPrint) { 
        return console.log(phrase + result);
    }

    return result;
}

let number1: number;
number1 = 5;

const number2 = 2.8;

const printResult = true;
const resultPhrase = 'Result is: ';

const result = add(number1, number2, printResult, resultPhrase);