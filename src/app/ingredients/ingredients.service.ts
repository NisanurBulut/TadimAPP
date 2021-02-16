import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class IngredientsService {
  // eventemitter subjet'e dönüştü
  ingredientsChanged = new Subject<Ingredient[]>();
  // subject sınıfı generic tipte
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Domates', 5),
    new Ingredient('Kabak', 1),
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // emit next'e dönüştü
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    // emit next'e dönüştü
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    // mevcut malzemeyi alalım
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
