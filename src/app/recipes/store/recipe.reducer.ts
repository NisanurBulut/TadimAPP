import { InitialState } from "@ngrx/store/src/models";
import { Recipe } from "../recipe.model";
import * as fromRecipesActions from './recipe.actions';

export interface State {
    recipes: Recipe[];
}
const initialState: State = {
    recipes: []
}
export function recipeReducer(state: State = initialState, action: fromRecipesActions.RecipesActions) {
    switch (action.type) {
        case fromRecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        default:
            return state;
    }
}
