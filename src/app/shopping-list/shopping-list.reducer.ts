import { Ingredient } from '../shared/ingredient.model';
import { Action } from '@ngrx/store';
import { ActionSequence } from 'protractor';

const initialState = {
    ingredients: [
        new Ingredient('Domates', 5),
        new Ingredient('Kabak', 1),
    ]
};
// buradaki actiona aslında bir interface
export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients: [...state.ingredients, action]
            };
    }
}