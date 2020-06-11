import { Recipe } from './recipe.model';

export class RecipeService{
  private  recipes:Recipe []=[
        new Recipe(
          'Karnıyarık',
        'Karnıyarık yemeği',
        'https://www.misssgibi.com/media/scaled/2019/10/16/karniyarik-tarifi-w1600.jpg')
      ];
      getRecipes() {
          return this.recipes.slice();
      }
}