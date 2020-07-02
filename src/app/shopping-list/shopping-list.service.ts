import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';


export class ShoppingListService {
         ingredientsChanged = new EventEmitter<Ingredient[]>();
         private ingredients: Ingredient[] = [
           new Ingredient('Domates', 5),
           new Ingredient('Kabak', 1),
         ];
         getIngredients() {
           return this.ingredients.slice();
         }
         addIngredient(ingredient: Ingredient) {
           this.ingredients.push(ingredient);
           this.ingredientsChanged.emit(this.ingredients.slice());
         }
       }
