import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export default class Product
{
    @IsNotEmpty()
    private title: string;
    
    @IsNumber()
    @IsPositive()
    private price: number;

    constructor(title: string, price: number)
    {
        this.title = title;
        this.price = price;
    }

    public getInformation(): string[]
    {
        return [this.title, `$${this.price}`];
    }
}