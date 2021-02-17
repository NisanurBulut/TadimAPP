import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';


export const ADD_INGREDIENT = '[Ingredient] Add Ingredient';
export const ADD_INGREDIENT_SUCCESS = '[Ingredient] Add Ingredient Success';
export const ADD_INGREDIENT_FAIL = '[Ingredient] Add Ingredient Fail';

export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

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

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient ) {
    }
}
export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;

}
export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {
    }
}
export class StopEdit implements Action {
    readonly type = STOP_EDIT;
    constructor() {
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
