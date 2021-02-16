
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromIngredientActions from './ingredients.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}
export interface AppState {
    ingredientList: State;
}
const initialState: State = {
    ingredients: [
        new Ingredient('Domates', 5),
        new Ingredient('Kabak', 1),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};
// buradaki actiona aslında bir interface
export function IngredientsReducer(
    state: State = initialState,
    action: fromIngredientActions.IngredientActions) {
    switch (action.type) {
        case fromIngredientActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case fromIngredientActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case fromIngredientActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            // ... spread operator
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case fromIngredientActions.DELETE_INGREDIENT:
            // ... spread operator
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                })
            };
        case fromIngredientActions.START_EDIT:
            // ... spread operator
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case fromIngredientActions.STOP_EDIT:
            // ... spread operator
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        default:
            return state;
    }
}
