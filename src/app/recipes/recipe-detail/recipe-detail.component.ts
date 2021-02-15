import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as fromRecipeActions from '../store/recipe.actions';
import * as fromShoppingActions from '../../shopping-list/store/shopping-list.actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<RecipeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = this.data.id;
  }

  ngOnInit() {
    this.store.select('recipes')
      .pipe(
        map(data => {
          return this.recipe = data.recipes.find((item) => item.id === this.id);
        })
      ).subscribe(result => {
        console.log(result);
        this.recipe = result;
      });
  }
  onAddToShoppingList() {
    this.store.dispatch(new fromShoppingActions.AddIngredients(this.recipe.ingredients));
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(this.id));
  }
}
