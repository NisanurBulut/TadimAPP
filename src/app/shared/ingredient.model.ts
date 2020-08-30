export class Ingredient {
    public name: string;
    public amount: number;
    // tslint:disable-next-line: variable-name
    constructor(_name: string, _amount: number) {
        this.amount = _amount;
        this.name = _name;
    }
}
