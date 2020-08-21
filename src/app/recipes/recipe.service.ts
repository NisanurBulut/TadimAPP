import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class RecipeService {
  // EventEmitter subject' dönüştü
  public recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Karnıyarık',
      'Karnıyarık yemeği',
      'https://www.misssgibi.com/media/scaled/2019/10/16/karniyarik-tarifi-w1600.jpg',
      [new Ingredient('Kabak', 1),
      new Ingredient('Domates', 1)]),
    new Recipe(
      'Sarma Dolma',
      'Sarma Dolma Yemeği',
      'https://i.ytimg.com/vi/w7B3xSnspYg/maxresdefault.jpg',
      [new Ingredient('Pirinç', 1),
      new Ingredient('Maydonoz', 1)])
  ];
  constructor(private slService: ShoppingListService) { }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    // haber verelim abonelere
    this.recipesChanged.next(this.recipes.slice());
  }
}
