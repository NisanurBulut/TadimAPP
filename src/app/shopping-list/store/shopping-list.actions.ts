import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {

    }
}
// önce action tanımı yapılır
export class AddIngredients {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}
// multiple action olduğu için payload erişimi olabilmesi adına bu tanımlama yapıldı
export type ShoppingListActions = AddIngredient | AddIngredients;
