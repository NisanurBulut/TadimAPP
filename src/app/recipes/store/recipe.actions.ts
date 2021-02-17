import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const UPDATE_RECIPE_SUCCESS = '[Recipe] Update Recipe Success';
export const UPDATE_RECIPE_FAIL = '[Recipe] Update Recipe Fail';

export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const DELETE_RECIPE_SUCCESS = '[Recipe] Delete Recipe Success';
export const DELETE_RECIPE_FAIL = '[Recipe] Delete Recipe Fail';

export const LOAD_RECIPES = '[Recipe] Load Recipe';
export const LOAD_RECIPES_SUCCESS = '[Recipe] Load Recipe Success';
export const LOAD_RECIPES_FAIL = '[Recipe] Load Recipe Fail';

export const ADD_RECIPE = '[Recipe] Add Recipe';
export const ADD_RECIPE_SUCCESS = '[Recipe] Add Recipe Success';
export const ADD_RECIPE_FAIL = '[Recipe] Add Recipe Fail';

export class LoadRecipes implements Action {
    readonly type = LOAD_RECIPES;
}
export class LoadRecipesSuccess implements Action {
    readonly type = LOAD_RECIPES_SUCCESS;
    constructor(public payload: Array<Recipe>) { }
}
export class LoadRecipesFail implements Action {
    readonly type = LOAD_RECIPES_FAIL;
    constructor(public payload: Error) { }
}
export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) {
    }
}
export class AddRecipeSuccess implements Action {
    readonly type = ADD_RECIPE_SUCCESS;
    constructor(public payload: Recipe) {
    }
}
export class AddRecipeFail implements Action {
    readonly type = ADD_RECIPE_FAIL;
    constructor(public payload: Error) { }
}

export class DeleteRecipeSuccess implements Action {
    readonly type = DELETE_RECIPE_SUCCESS;
    constructor(public payload: number) {
    }
}
export class DeleteRecipeFail implements Action {
    readonly type = DELETE_RECIPE_FAIL;
    constructor(public payload: Error) { }
}
export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) {
    }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: Recipe) { }
}
export class UpdateRecipeSuccess implements Action {
    readonly type = UPDATE_RECIPE_SUCCESS;
    constructor(public payload: Recipe) {
    }
}
export class UpdateRecipeFail implements Action {
    readonly type = UPDATE_RECIPE_FAIL;
    constructor(public payload: Error) { }
}
export type RecipesActions = UpdateRecipeSuccess |
    UpdateRecipeFail |
    UpdateRecipe |
    DeleteRecipe |
    DeleteRecipeSuccess |
    DeleteRecipeFail |
    AddRecipe |
    AddRecipeFail |
    AddRecipeSuccess |
    LoadRecipes |
    LoadRecipesFail |
    LoadRecipesSuccess;
