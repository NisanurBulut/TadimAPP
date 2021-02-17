import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class IngredientsService {
  constructor(private http: HttpClient) {
  }

  getIngredients() {
    return this.http.get<Array<Ingredient>>(environment.apiIngredientUrl).pipe(delay(500));
  }
  getIngredient(id: number) {
    return this.http.get(`${environment.apiIngredientUrl}/${id}`)
      .pipe(delay(500));
  }
  addIngredient(ingredient: Ingredient) {
    return this.http.post(environment.apiIngredientUrl, ingredient)
      .pipe(delay(500));
  }

  updateIngredient(newIngredient: Ingredient) {
    return this.http.put(`${environment.apiIngredientUrl}/${newIngredient.id}`, newIngredient)
    .pipe(delay(500));
  }
  deleteIngredient(id: number) {
    return this.http.delete(`${environment.apiIngredientUrl}/${id}`)
      .pipe(delay(500));
  }
}
