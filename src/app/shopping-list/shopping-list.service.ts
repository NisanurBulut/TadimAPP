import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService {
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
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // emit next'e dönüştü
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // tslint:disable-next-line: forin
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    // emit next'e dönüştü
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
