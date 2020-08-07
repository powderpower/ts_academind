import { Listener } from './Types';

export abstract class State<T>
{
    protected listeners: Listener<T>[] = [];
    
    public addListener(listener: Listener<T>): void
    {
        this.listeners.push(listener);
    }
}