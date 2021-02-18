import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromIngredientActions from './store/ingredients.actions';
import { Ingredient } from '../shared/ingredient.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css'],
})
export class IngredientListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredient: Ingredient;
  constructor(
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.select(a => a.ingredients)
      .pipe(
        map((data) => {
          return data.ingredients;
        })
      ).subscribe((items) => {
        this.ingredients = [...items];
      });
  }
  ngOnDestroy(): void {
  }
  onEditItem(item: Ingredient) {
    this.store.dispatch(new fromIngredientActions.SetIngredient(item.id));
  }
}
