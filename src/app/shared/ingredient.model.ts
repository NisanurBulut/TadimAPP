export class Ingredient {
    public name: string;
    public amount: number;
    public id: number;
    constructor(_name: string, _amount: number) {
        this.amount = _amount;
        this.name = _name;
    }
}
