import { ActionReducerMap } from '@ngrx/store';
import * as fromIngredientActions from '../ingredients/store/ingredients.reducer';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';

export interface AppState {
    ingredientList: fromIngredientActions.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
}
export const appReducer: ActionReducerMap<AppState> = {
    ingredientList: fromIngredientActions.IngredientReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
};
