import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}
export interface AppState {
    shoppingList: State;
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
export function shoppingListReducer(
    state: State = initialState,
    action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;
            // ... spread operator
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            // ... spread operator
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            };
        case ShoppingListActions.START_EDIT:
            // ... spread operator
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
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
