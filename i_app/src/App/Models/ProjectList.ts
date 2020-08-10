import { Stasusable, ProjectStatus } from './Base/Types.js';
import Project from './Project.js';
import ProjectState from './ProjectState.js';
import ProjectItem from './ProjectItem.js';
import Component from './Base/Component.js';
import Autobind from '../Decorators/Autobind.js';

export default class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget
{
    private type: Stasusable;
    private assignedProjects: Project[];
    private projectStateContainer: ProjectState;
    
    constructor(type: Stasusable, projectStateContainer: ProjectState)
    {
        super('project-list', 'app', false, `${type}-projects`);

        this.projectStateContainer = projectStateContainer;

        this.type = type;

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent): void
    {
        if (
            event.dataTransfer &&
            event.dataTransfer.types.length &&
            event.dataTransfer.types[0] === 'text/plain'
        ) {
            event.preventDefault();
            
            const listEl = this.element.querySelector('ul')!;

            listEl.classList.add('droppable');
        }
    }

    @Autobind
    dropHandler(event: DragEvent): void
    {
        const prjId = event.dataTransfer!.getData('text/plain');

        const type = this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished

        this.projectStateContainer.moveProject(prjId, type);
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void
    {
        const listEl = this.element.querySelector('ul')!;

        listEl.classList.remove('droppable');
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
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        this.projectStateContainer.addListener((projects: Project[]) => {
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