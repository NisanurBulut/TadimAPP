
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromIngredientActions from './ingredients.actions';

export interface State {
    ingredients: Ingredient[];
    loading: boolean;
    error: Error;
}
export interface AppState {
    ingredientList: State;
}
const initialState: State = {
    ingredients: [],
    loading: false,
    error: null
};
// buradaki actiona aslında bir interface
export function IngredientsReducer(
    state: State = initialState,
    action: fromIngredientActions.IngredientActions) {
    switch (action.type) {
        case fromIngredientActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                loading: true
            };
        case fromIngredientActions.ADD_INGREDIENT_SUCCESS:
                return { ...state, ingredients: [...state.ingredients, action.payload], loading: false };
        case fromIngredientActions.ADD_INGREDIENT_FAIL:
                return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}
