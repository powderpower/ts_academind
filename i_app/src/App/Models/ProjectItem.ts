import { Project } from './Project.js';
import { Component } from './Base/Component.js';
import { Autobind } from '../Decorators/Autobind.js';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
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
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
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