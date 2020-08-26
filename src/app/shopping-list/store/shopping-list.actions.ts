import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
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
export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: { index: number, ingredient: Ingredient }) {

    }
}
export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor(public payload: number) {

    }
}
// multiple action olduğu için payload erişimi olabilmesi adına bu tanımlama yapıldı
export type ShoppingListActions = AddIngredient | AddIngredient | UpdateIngredient | DeleteIngredient;
