import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';


export const LOAD_INGREDIENTS = '[Ingredient] Load Ingredients';
export const LOAD_INGREDIENTS_SUCCESS = '[Ingredient] Load Ingredients Success';
export const LOAD_INGREDIENTS_FAIL = '[Ingredient] Load Ingredients Fail';

export const ADD_INGREDIENT = '[Ingredient] Add Ingredient';
export const ADD_INGREDIENT_SUCCESS = '[Ingredient] Add Ingredient Success';
export const ADD_INGREDIENT_FAIL = '[Ingredient] Add Ingredient Fail';

export const DELETE_INGREDIENT = '[INGREDIENT] Delete Ingredient';
export const DELETE_INGREDIENT_SUCCESS = '[INGREDIENT] Delete Ingredient Success';
export const DELETE_INGREDIENT_FAIL = '[INGREDIENT] Delete Ingredient Fail';

export const UPDATE_INGREDIENT = '[Ingredient] Update Ingredient';
export const UPDATE_INGREDIENT_SUCCESS = '[Ingredient] Update Ingredient Success';
export const UPDATE_INGREDIENT_FAIL = '[Ingredient] Update Ingredient Fail';

export class UpdateRecipe implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) { }
}
export class UpdateRecipeSuccess implements Action {
    readonly type = UPDATE_INGREDIENT_SUCCESS;
    constructor(public payload: Ingredient) {
    }
}
export class UpdateRecipeFail implements Action {
    readonly type = UPDATE_INGREDIENT_FAIL;
    constructor(public payload: Error) { }
}

export class LoadIngredients implements Action {
    readonly type = LOAD_INGREDIENTS;
}
export class LoadIngredientsSuccess implements Action {
    readonly type = LOAD_INGREDIENTS_SUCCESS;
    constructor(public payload: Array<Ingredient>) { }
}
export class LoadIngredientFail implements Action {
    readonly type = LOAD_INGREDIENTS_FAIL;
    constructor(public payload: Error) { }
}

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {
    }
}

export class AddIngredientSuccess implements Action {
    readonly type = ADD_INGREDIENT_SUCCESS;
    constructor(public payload: Ingredient) {
    }
}
export class AddIngredientFail implements Action {
    readonly type = ADD_INGREDIENT_FAIL;
    constructor(public payload: Error) { }
}

export class DeleteIngredientSuccess implements Action {
    readonly type = DELETE_INGREDIENT_SUCCESS;
    constructor(public payload: number) {
    }
}
export class DeleteIngredientFail implements Action {
    readonly type = DELETE_INGREDIENT_FAIL;
    constructor(public payload: Error) { }
}
export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor(public payload: number) {
    }
}
export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient ) {
    }
}


// multiple action olduğu için payload erişimi olabilmesi adına bu tanımlama yapıldı
export type IngredientActions =
    AddIngredient |
    AddIngredientSuccess |
    AddIngredientFail |
    UpdateIngredient |
    DeleteIngredient |
    StartEdit |
    StopEdit;
