/**
 * Так не делается, то это для примера.
 */

const ADMIN = 1;
const READ_ONLY = 0;

enum ROLE { ADMIN, READ_ONLY }

const person: {
    name: string;
    age: number;
    hobbies: string[];
    anyData: any[];
    role: [number, string] // тип typle - вводит ограничения на массив. не работает для array.push()
    accessLevel: number,
} = {
    name: 'a',
    age: 30,
    hobbies: ['sports', 'cooking'],
    anyData: ['string', true, 1],
    role: [2, 'author'],
    accessLevel: ROLE.ADMIN,
};

console.log(ROLE);

