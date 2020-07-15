/**
 * Дженерики нужны, чтобы заключать что-то в общий тип.
 */
const names: Array<string> = []; // string[];

const promise: Promise<string> = new Promise((resolve, reject) => {
    return setTimeout(() => {
        return resolve('Hi there!');
    }, 2e3);
});

promise.then(data => {
    console.log(data);
});

/**
 * По договоренности кастомный
 * дженерик имеются как <T>
 */
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Andy'}, {age: 26});

console.log(mergedObj.name);

interface Lengthy {
    length: number,
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';

    if (element.length) {
        descriptionText = 'Got ' + element.length + ' elements.';
    }

    return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

console.log(extractAndConvert({ name: 'Andy' }, 'name'));

/**
 * Generic Classes
 */
class DataStorage<T> {
    private data: T[] = [];

    public addItem(item: T) {
        this.data.push(item);
    }

    public removeItem(item: T) {
        const itemIndex = this.data.indexOf(item);
        
        if (itemIndex === -1) {
            return;
        }
        
        this.data.splice(itemIndex, 1);
    }

    public getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();

textStorage.addItem('Max');
textStorage.addItem('Manu');

console.log(textStorage.getItems());

textStorage.removeItem('Max');

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

numberStorage.addItem(1);
numberStorage.addItem(2);

console.log(numberStorage.getItems());

numberStorage.removeItem(1);

console.log(numberStorage.getItems());

const objStorage = new DataStorage<object>();

const maxObj = { name: 'Max' };

objStorage.addItem(maxObj);
objStorage.addItem({ name: 'Manu' });

console.log(objStorage.getItems());

objStorage.removeItem(maxObj);

console.log(objStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

/**
 * Partial<CourseGoal> - объявляет,
 * что после преобразований
 * объект будет соответствовать интерфесу
 */
function createCourseGoal(
    title: string,
    description: string,
    date: Date
): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};

    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}

/**
 * Readonly не даст записывать в массив.
 */
const namesData: Readonly<string[]> = ['Max', 'Anna'];

/**
 * не получится
 */
// namesData.push('Manu');