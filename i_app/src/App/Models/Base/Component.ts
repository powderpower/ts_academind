export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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