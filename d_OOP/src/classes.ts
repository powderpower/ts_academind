const ROLE_ADMIN = 'ADMIN';

abstract class AbstractBase
{
    protected abstract updateNameCode(): this;
}

class Base
{
    /** readonly - присваивается 1 раз, больше не меняется, как const */
    protected readonly level: number = 1;
    
    protected id: number        = 0;
    protected name: string      = '';
    protected nameCode: string  = '';

    constructor(id: number, name: string) {
        this.id     = id;
        this.name   = name;

        this.updateNameCode();
    }

    protected updateNameCode(): this
    {
        this.nameCode + '-001';

        return this;
    }
}

class Department extends Base
{
    protected accessRoles: string[] = [];
    
    /**
     * Геттер.
     */
    get depName(): string
    {
        return this.name;
    }

    /**
     * Сеттер.
     */
    set depName(name: string)
    {
        this.name = name;
        this.updateNameCode();
    }

    public getNameCode(): string
    {
        return this.nameCode;
    }

    public setAccessRoleAdmin(): this
    {
        this.accessRoles.push(ROLE_ADMIN);

        return this;
    }

    /**
     * Геттер.
     */
    get roles(): string[]
    {
        return this.accessRoles;
    }
}

class ITDepartment extends Department
{
    constructor(id: number) {
        /** super() как parent::__construct() в php */
        super(id, 'IT');

        this.setAccessRoleAdmin();
    }

    public static createEmployee(name: string): object
    {
        return {
            name: name,
        };
    }
}

class SingletonDepartment extends Department
{
    private static instance: SingletonDepartment;
    
    private constructor(id: number) {
        super(id, 'Singleton-5');
    }

    static getInstance()
    {
        if (this.instance instanceof SingletonDepartment) {
            return this.instance;
        }

        this.instance = new SingletonDepartment(5);

        return this.instance;
    }
}

const IT = new ITDepartment(5);

/**
 * Применение геттера.
 */
IT.depName = 'IT-2';

console.log(IT.depName, IT.roles);

console.log(ITDepartment.createEmployee('Andy'));

const singletonDepartment = SingletonDepartment.getInstance();

console.log(singletonDepartment.depName);