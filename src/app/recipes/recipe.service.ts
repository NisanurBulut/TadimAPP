import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  public recipeSelected =new EventEmitter<Recipe>();

  private  recipes: Recipe []=[
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
      constructor(private slService:ShoppingListService){}
      getRecipes() {
          return this.recipes.slice();
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
}
