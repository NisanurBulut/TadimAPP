import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromIngredientActions from './store/ingredients.actions';
import { Ingredient } from '../shared/ingredient.model';


@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css'],
})
export class IngredientListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingredient: Ingredient;
  constructor(
    private store: Store<fromApp.AppState>) {
    this.store.dispatch(new fromIngredientActions.LoadIngredients());
  }

  ngOnInit() {
    this.ingredients = this.store.select(a => a.ingredients);
  }
  ngOnDestroy(): void {
  }
  onEditItem(item: Ingredient) {
    this.store.dispatch(new fromIngredientActions.SetIngredient(item.id));
  }
}
