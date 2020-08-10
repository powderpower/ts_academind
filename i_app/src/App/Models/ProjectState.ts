import State from './Base/State.js';
import Project from './Project.js';
import { BaseProject, ProjectStatus } from './Base/Types.js';

export default class ProjectState extends State<Project>
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

        this.updateListeners();
    }

    public moveProject(projectId: string, newStatus: ProjectStatus): void
    {
        const project = this.projects.find(prj => prj.id === projectId);

        if (! (project instanceof Project) || project.status === newStatus) {
            return;
        }

        project.status = newStatus;

        this.updateListeners();
    }

    private updateListeners(): void
    {
        for (const listerFn of this.listeners) {
            listerFn(this.projects.slice());
        }
    }
}