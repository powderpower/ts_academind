// Project State Management

type Project = {
    id: string,
    title: string,
    description: string,
    people: number,
};

class ProjectState
{
    private projects: any[] = [];

    private listeners: any[] = [];

    private static instance: ProjectState;

    private constructor()
    {

    }

    static getInstance(): ProjectState
    {
        if (this.instance instanceof ProjectState) {
            return this.instance;
        }

        this.instance = new ProjectState();

        return this.instance;
    }

    private createProject(title: string, description: string, numberOfPeople: number): Project
    {
        return {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numberOfPeople,
        }
    }

    public addListener(listener: Function): void
    {
        this.listeners.push(listener);
    }

    public addProject(title: string, description: string, numberOfPeople: number): void
    {
        const newProject = this.createProject(title, description, numberOfPeople);

        this.projects.push(newProject);

        for (const listerFn of this.listeners) {
            listerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}

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

type Stasusable = 'active' | 'finished';

// ProjectList Classe
class ProjectList {
    private templateElement: HTMLTemplateElement;
    private hostElement: HTMLDivElement;
    private element: HTMLElement;
    private type: Stasusable;
    private assignedProjects: any[];
    
    constructor(type: Stasusable)
    {
        this.type = type;
        const
            templateElement = document.getElementById('project-list'),
            hostElement = document.getElementById('app');

        this.assignedProjects = [];

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
        this.element.id = `${this.type}-projects`;

        console.log(this.element);

        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;

        console.log(listEl);

        for (const prjItem of this.assignedProjects) {

            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);

        }
    }

    private renderContent(): void
    {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach(): void
    {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }


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

    private gatherUserInput(): [string, string, number] | void
    {
        const
            enteredTitle = this.titleInputElement.value,
            enteredDescription = this.descriptionInputElement.value,
            enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        };

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };

        if (
            ! validate(titleValidatable) ||
            ! validate(descriptionValidatable) ||
            ! validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
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

        projectState.addProject(title, desc, people);

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
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');

