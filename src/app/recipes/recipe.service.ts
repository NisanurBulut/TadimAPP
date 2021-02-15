import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

@Injectable()
export class RecipeService {
  // EventEmitter subject' dönüştü
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private _http: HttpClient,
    private store: Store<fromApp.AppState>) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this._http.get<Array<Recipe>>(environment.apiUrl).pipe(delay(500));
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  addRecipe(recipe: Recipe) {
    return this._http.post(environment.apiUrl, recipe)
      .pipe(delay(500));
  }
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(id: number) {
    return this._http.delete(`${environment.apiUrl}/${id}`)
      .pipe(delay(500));
  }
}
