import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromRecipeActions from './store/recipe.actions';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new fromRecipeActions.LoadRecipes());
  }

  ngOnInit() {
  }
}
