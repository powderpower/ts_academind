import ProjectState from './ProjectState.js';
import Component from './Base/Component.js';
import Autobind from '../Decorators/Autobind.js';
import Validatable from './Base/Validatable.js';
import { validate } from '../Helpers/ValidateHelper.js';

export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>
{
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;
    private projectStateContainer: ProjectState;
    
    private constructor(projectStateContainer: ProjectState)
    {
        super('project-input', 'app', true, 'user-input');

        this.projectStateContainer = projectStateContainer;

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

        this.projectStateContainer.addProject(title, desc, people);

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

    public static initForm(projectStateContainer: ProjectState): ProjectInput
    {
        const model = new this(projectStateContainer);

        return model;
    }
}