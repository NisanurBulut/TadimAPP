import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay, map } from 'rxjs/operators';
import { User } from '../auth/user.model';

@Injectable()
export class RecipeService {
  private activeUser: User;
  private recipes: Recipe[] = [];

  constructor(private _http: HttpClient, private store: Store<fromApp.AppState>) {
    this.store.select('auth')
      .pipe(
        map((data) => {
          return data.user;
        })
      ).subscribe((user) => {
        this.activeUser = user;
      });
  }

  getRecipes() {
    return this._http.get<Array<Recipe>>(`${environment.apiUrl}?userId=${this.activeUser.id}`).pipe(delay(500));
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  addRecipe(recipe: Recipe) {
    const newRecipe = { ...recipe, userId: this.activeUser.id };
    console.log('newRecipe', newRecipe);
    return this._http.post(environment.apiUrl, newRecipe)
      .pipe(delay(500));
  }

  deleteRecipe(id: number) {
    return this._http.delete(`${environment.apiUrl}/${id}`)
      .pipe(delay(500));
  }
}
