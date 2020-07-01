import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    private ingredients: Ingredient[]= [
        new Ingredient('Domates',5), new Ingredient('Kabak',1)
    ];
    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient:Ingredient)
    {
this.ingredients.push(ingredient);
    }
}
