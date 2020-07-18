// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

/*
function validate(validatableInput: Validatable) {
    let isValid = true;

    if (validatableInput.required typeof ) {
        isValid = isValid && validatableInput.value.trim().length
    }

    return isValid;
}
*/

// Autobind Decorator
function Autobind(
    _target:any,
    _methodName: string,
    descriptor: PropertyDescriptor
) {
    const originMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originMethod.bind(this);
        }
    }

    return adjDescriptor;
}

// ProjectInput Class
class ProjectInput
{
    private templateElement: HTMLTemplateElement;
    private hostElement: HTMLDivElement;
    private element: HTMLFormElement;
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;
    
    private constructor()
    {
        const
            templateElement = document.getElementById('project-input'),
            hostElement = document.getElementById('app');

        if (! (templateElement instanceof HTMLTemplateElement)) {
            throw new Error('Template element is not defined!');
        }

        if (! (hostElement instanceof HTMLDivElement)) {
            throw new Error('Host element is not defined!s');
        }

        this.templateElement = templateElement as HTMLTemplateElement;
        
        this.hostElement = hostElement as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private attach(): void
    {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }

    private gatherUserInput(): [string, string, number]
    {
        const
            enteredTitle = this.titleInputElement.value,
            enteredDescription = this.descriptionInputElement.value,
            enteredPeople = this.peopleInputElement.value;

        if ( true
            // validate({value: enteredTitle, required: true, minlengt: 5})
            // validate({value: enteredDescription, required: true, minlengt: 5})
            // validate({value: enteredPeople, required: true, minlengt: 5})
        ) {

        }

        return [enteredTitle, enteredDescription, +enteredPeople];
    }

    private clearInputs(): void
    {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @Autobind
    private submitHandler(event: Event): void
    {
        event.preventDefault();

        const userInput = this.gatherUserInput();

        if (! Array.isArray(userInput)) {
            throw new Error('Values is not valid!');
        }

        const [title, desc, people] = userInput;
        console.log(title, desc, people);
        this.clearInputs();
    }

    private configure(): void
    {
        this.element.addEventListener('submit', this.submitHandler);
    }

    public static initForm(): ProjectInput
    {
        const model = new this;

        return model;
    }
}

const prjInput = ProjectInput.initForm();

