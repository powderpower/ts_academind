export type BaseProject = {
    id: string,
    title: string,
    description: string,
    people: number,
};

export enum ProjectStatus { Active, Finished }

export type Listener<T> = (items: T[]) => void;

export type Stasusable = 'active' | 'finished';