function PropertyLogger(target:any, proertyName: string) {
    console.log('Property decorator!');
    console.log(target, proertyName);
}

function AccessorLoger(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function MethodsLogger(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function ArgumentDecorator(target: any, name: string, position: number) {
    console.log('Argument decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @PropertyLogger
    private _title: string;
    private _price: number;

    @AccessorLoger
    set price(val: number) {
        if (val <= 0) {
            throw new Error('Invalid price - should be positive!');
        }

        this._price = val;
    }

    constructor(title: string, price: number) {
        this._title = title;
        this._price = price;
    }

    @MethodsLogger
    public getPriceWithTax(@ArgumentDecorator tax: number) {
        return this._price * (1 + tax);
    }
}

const firstProduct = new Product('Book', 19);
const secondProduct = new Product('Book 2', 20);