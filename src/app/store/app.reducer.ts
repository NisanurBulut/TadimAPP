import { ActionReducerMap } from '@ngrx/store';
import * as fromIngredients from '../ingredients/store/ingredients.reducer';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';

export interface AppState {
    ingredients: fromIngredients.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
}
export const appReducer: ActionReducerMap<AppState> = {
    ingredients: fromIngredients.IngredientReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
};
