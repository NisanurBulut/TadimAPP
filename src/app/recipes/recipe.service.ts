import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

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
        'Salma Dolma',
        'https://i.ytimg.com/vi/w7B3xSnspYg/maxresdefault.jpg',
        [new Ingredient('Pirinç', 1),
         new Ingredient('Maydonoz', 1)])
      ];
      getRecipes() {
          return this.recipes.slice();
      }
}
