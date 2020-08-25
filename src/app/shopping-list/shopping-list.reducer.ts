import { Ingredient } from '../shared/ingredient.model';

const initialState = {
    ingredients: [
        new Ingredient('Domates', 5),
        new Ingredient('Kabak', 1),
    ]
};
export function shoppingListReducer(state=initialState, action) { }