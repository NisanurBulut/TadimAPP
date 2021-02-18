
import { Recipe } from '../recipe.model';
import * as fromRecipesActions from './recipe.actions';

export interface State {
    recipes: Recipe[];
    loading: boolean;
    error: Error;
}
const initialState: State = {
    recipes: [],
    loading: false,
    error: null
};

export function recipeReducer(state: State = initialState, action: fromRecipesActions.RecipesActions) {
    switch (action.type) {
        case fromRecipesActions.LOAD_RECIPES:
            return { ...state, loading: true };
        case fromRecipesActions.LOAD_RECIPES_SUCCESS:
            return {
                ...state, loading: false, recipes: action.payload
            };
        case fromRecipesActions.LOAD_RECIPES_FAIL:
            return { ...state, error: action.payload, loading: false };
        case fromRecipesActions.ADD_RECIPE:
            return {
                ...state,
                loading: true
            };
        case fromRecipesActions.ADD_RECIPE_SUCCESS:
            return { ...state, recipes: [...state.recipes, action.payload], loading: false };

        case fromRecipesActions.ADD_RECIPE_FAIL:
            return { ...state, error: action.payload, loading: false };

        case fromRecipesActions.UPDATE_RECIPE:
            return {
                ...state,
                loading: true
            };
        case fromRecipesActions.UPDATE_RECIPE_SUCCESS:
            const items = state.recipes.filter(a => a.id !== action.payload.id);
            return {
                ...state,
                recipes: [...items, action.payload],
                loading: true
            };
        case fromRecipesActions.UPDATE_RECIPE_FAIL:
            return { ...state, error: action.payload, loading: false };
        case fromRecipesActions.DELETE_RECIPE:
            return {
                ...state,
                loading: true
            };
        case fromRecipesActions.DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: state.recipes.filter((recipe) => {
                    return recipe.id !== action.payload;
                })
            };
        case fromRecipesActions.DELETE_RECIPE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
