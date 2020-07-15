/**
 * Объединение типов.
 * (такая же тема, как имплеменитрование нескольким интерфейсам)
 */
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

interface ElevatedEmployee extends Employee, Admin {

}
/**
 * Тоже самое, как и
 */
// type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Andy',
    privileges: ['create-server'],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

/**
 * Типизация аргументов объединенных типов.
 */
function add(a: number, b: number): number
function add(a: string, b: string): string

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const result = add('Andy', 'B.');

result.split(' ');

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);

    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }

    if ('startDate' in emp) {
        console.log('Start date: ' + emp.startDate);
    }
}

printEmployeeInformation(e1);

class Car
{
    public drive() {
        console.log('Driving...');
    }
}

class Truck
{
    public drive()
    {
        console.log('Driving a truck...');
    }

    public loadCargo(amount: number)
    {
        console.log('Loading cargo ...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    if (vehicle instanceof Truck) {
        vehicle.loadCargo(55);
    }
}

useVehicle(v1);
useVehicle(v2);

interface Bird
{
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

/**
 * Union type
 */
type Animal = Bird | Horse;

function moveAnimal(animal: Animal)
{
    let speed;
    
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    
    console.log('Moving with speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

/**
 * Типы элементов.
 */

const paragraph = document.querySelector('p');

const idedParagraph = document.getElementById('message-output');

/**
 * Это конструкция определения типа элемента.
 */
const userInput = <HTMLInputElement>document.getElementById('user-input');

/** или, тоже самое */

const guestInput = document.getElementById('guest-input') as HTMLInputElement;

userInput.value = 'Yo!';

/**
 * Объявление типов свойств.
 */
interface ErrorContainer {
    /**
     * Здесь написано, что каждая переменная
     * должна быть названа строкой
     * и ее значение так же должно быть строкой.
     */
    [pror: string]: string;
}

const errorBag: ErrorContainer = {
    /**
     * Но так можно,
     * потому что 1 может быть принятна как строка.
     * (это странно)
     */
    1: 'Not a valid email',
    email: 'Not a valid email!',
};

const fetchedUserData = {
    id:'u1',
    name: 'Max',
    job: {
        title: 'CEO',
    }
};

/**
 * Фича от версии 3.7
 * Если есть проперти,
 * то вызвать из этого объекта.
 */
console.log(fetchedUserData?.job?.title);

const userInputData = '';

/**
 * В переменной будет 'DEFAULT'
 * 
 * || если значение слева == null
 * ?? если значение слева === null или === undefined
 */
const storedData = userInputData || 'DEFAULT';
// const storedData = userInputData ?? 'DEFAULT';

console.log(storedData);