

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromIngredientsActions from './ingredients.actions';

export interface State {
    ingredient: Ingredient,
    ingredients: Ingredient[];
    loading: boolean;
    error: Error;
}
const initialState: State = {
    ingredient: null,
    ingredients: [],
    loading: false,
    error: null
};

export function IngredientReducer(state: State = initialState, action: fromIngredientsActions.IngredientActions) {
    switch (action.type) {
        case fromIngredientsActions.LOAD_INGREDIENTS:
            return { ...state, loading: true };
        case fromIngredientsActions.LOAD_INGREDIENTS_SUCCESS:
            return {
                ...state, loading: false, ingredients: action.payload
            };
        case fromIngredientsActions.LOAD_INGREDIENTS_FAIL:
            return { ...state, error: action.payload, loading: false };
        case fromIngredientsActions.ADD_INGREDIENT:
            return {
                ...state,
                loading: true
            };
        case fromIngredientsActions.ADD_INGREDIENT_SUCCESS:
            return { ...state, ingredients: [...state.ingredients, action.payload], loading: false };

        case fromIngredientsActions.ADD_INGREDIENT_FAIL:
            return { ...state, error: action.payload, loading: false };

        case fromIngredientsActions.UPDATE_INGREDIENT:
            return {
                ...state,
                loading: true
            };
        case fromIngredientsActions.UPDATE_INGREDIENT_SUCCESS:
            const items = state.ingredients.filter(a => a.id !== action.payload.id);
            return { ...state, ingredients: [...items, action.payload], loading: false };

        case fromIngredientsActions.UPDATE_INGREDIENT_FAIL:
            return { ...state, error: action.payload, loading: false };
        case fromIngredientsActions.DELETE_INGREDIENT:
            return {
                ...state,
                loading: true
            };
        case fromIngredientsActions.SET_INGREDIENT:
            return {
                ...state,
                ingredient: state.ingredients.find(a => a.id === action.payload),
                loading: false
            };
        case fromIngredientsActions.CLEAR_INGREDIENT:
            return {
                ...state,
                ingredient: null,
                loading: false
            };
        case fromIngredientsActions.DELETE_INGREDIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredients: state.ingredients.filter((recipe) => {
                    return recipe.id !== action.payload;
                })
            };
        case fromIngredientsActions.DELETE_INGREDIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
