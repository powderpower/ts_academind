let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

/**
 * Так сделать нельзя.
 * Отличие unknown от any в том,
 * что присвоить в any можно любое значение,
 * в то время как в unknown можно присвоить только
 * то, значение, тип данных которого не определено.
 */
// userName = userInput;

/**
 * never - тип данных, обозначающий,
 * что выполнение функции не дойдет до конца и не будет иметь возврата.
 * void, в свою очередь, обозначает что выполнение функции дойдет до конца.
 */
function generateError(message: string, code: number): never {
    throw {message: message, errorCode: code};
}

generateError('An error occured!', 500);