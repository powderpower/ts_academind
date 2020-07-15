/**
 * По договоренности декораторы
 * называются с большой буквы.
 * 
 * Декораторы идут всегда вместе с классом.
 * 
 * Декортаторы выполняются как обычно, но
 * функции декоратора выполняются от нижнего к верхнему
 * 
 * Как вариант применения =>
 * Тот, кто импортирует класс,
 * также получит в обработку декоратор,
 * который выполнит определенные действия при инициализации класса.
 * 
 * Если в аргументах в тайпскрипте указать _ - это будет пониматься как, ок аргумент есть, но его не нужно использовать.
 */
function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    
    return function(constructor: any) {
        console.log('rendering template...');
        
        const hookEl = document.getElementById(hookId);
        const p = new constructor();

        if (hookEl) {
            hookEl.innerHTML = template;
            /**
             * ! - обозначает, что свойство точно будет.
             */
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    public name = 'Max';

    constructor() {
        console.log('Creating person object...');
    }
}