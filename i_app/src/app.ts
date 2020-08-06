// Drag & Drop Interfaces
interface Draggable
{
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget
{
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// Project Type
type BaseProject = {
    id: string,
    title: string,
    description: string,
    people: number,
};

enum ProjectStatus { Active, Finished }

class Project
{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus,
    ) {

    }
}

// Project State Management

type Listener<T> = (items: T[]) => void;

abstract class State<T>
{
    protected listeners: Listener<T>[] = [];
    
    public addListener(listener: Listener<T>): void
    {
        this.listeners.push(listener);
    }
}

class ProjectState extends State<Project>
{
    private projects: any[] = [];

    private static instance: ProjectState;

    private constructor()
    {
        super();
    }

    static getInstance(): ProjectState
    {
        if (this.instance instanceof ProjectState) {
            return this.instance;
        }

        this.instance = new ProjectState();

        return this.instance;
    }

    private createProject(title: string, description: string, numberOfPeople: number): BaseProject
    {
        return new Project(
            Math.random().toString(),
            title,
            description,
            numberOfPeople,
            ProjectStatus.Active
        );
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
interface Validatable
{
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

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    private templateElement: HTMLTemplateElement;
    private hostElement: T;
    protected element: U;

    constructor(
        templateId: string,
        hostId: string,
        insertInBeginning: boolean = true,
        newElementId?: string
    ) {
        const
            templateElement = document.getElementById(templateId),
            hostElement = document.getElementById(hostId);

        if (! (templateElement instanceof HTMLTemplateElement)) {
            throw new Error('Template element is not defined!');
        }

        if (! (hostElement instanceof HTMLElement)) {
            throw new Error('Host element is not defined!s');
        }

        this.templateElement = templateElement as HTMLTemplateElement;
        
        this.hostElement = hostElement as T;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as U;

        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertInBeginning);
    }

    private attach(insertInBeginning: boolean): void
    {
        const postition = insertInBeginning ? 'afterbegin' : 'beforeend';
        
        this.hostElement.insertAdjacentElement(postition, this.element);
    }

    protected abstract configure(): void;
    protected abstract renderContent(): void;
}

// ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
{
    private project: Project;

    get persons()
    {
        if (this.project.people === 1) {
            return '1 person';
        }

        return `${this.project.people} persons`;
    }
    
    constructor(hostId: string, project: Project)
    {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent()
    }

    @Autobind
    dragStartHandler(event: DragEvent): void
    {
        console.log(event);
    }

    dragEndHandler(_: DragEvent)
    {
        console.log('DragEnd');
    }

    protected configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragStartHandler);
    }

    protected renderContent(): void
    {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('h2')!.textContent = this.project.title;
    }
}
// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement>
{
    private type: Stasusable;
    private assignedProjects: Project[];
    
    constructor(type: Stasusable)
    {
        super('project-list', 'app', false, `${type}-projects`);

        this.type = type;

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    protected renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;

        listEl.innerHTML = '';

        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }

    protected configure(): void
    {
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === ProjectStatus.Active;
                    }

                    return prj.status === ProjectStatus.Finished;
                });
            
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    
    protected renderContent(): void
    {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

}

// ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>
{
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;
    
    private constructor()
    {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
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

    protected configure(): void
    {
        this.element.addEventListener('submit', this.submitHandler);
    }

    protected renderContent()
    {
        return;
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

