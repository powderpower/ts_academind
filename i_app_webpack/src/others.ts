// import _ from 'lodash'; не, работае, т.к. TS не понимает что это
// нужно ставить, к примеру, 
import _ from 'lodash'; // теперь работает

console.log(_.shuffle([1, 2, 3]));

declare var GLOBAL: any;

console.log(GLOBAL);

import Product from './Others/Models/Product';
import "reflect-metadata";
import { plainToClass } from 'class-transformer';

const products = [
    { title: 'Book 1', price: 29.99 },
    { title: 'Book 2', price: 10.99 },
];

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}

import { validate } from 'class-validator';

const newProduct = new Product('', -5.99);

validate(newProduct)
    .then(errors => {
        if (errors.length) {
            console.log('Class validation errors:');
            console.log(errors);
        }
    });

console.log(newProduct.getInformation());