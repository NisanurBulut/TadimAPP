import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ingredientListActions from './store/ingredients.actions';
import { Ingredient } from '../shared/ingredient.model';


@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css'],
})
export class IngredientListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('ingredientList');
  }
  ngOnDestroy(): void {
  }
  onEditItem(index: number) {
   this.store.dispatch(new ingredientListActions.StartEdit(index));
  }
}
