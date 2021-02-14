import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as fromRecipeActions from '../store/recipe.actions';
import * as fromShoppingActions from '../../shopping-list/store/shopping-list.actions';
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
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // router'dan gelen id değerini alalım aşağıdaki yaklaşım doğru değil
    // const id = this.route.snapshot.params['id'];
    this.route.params.pipe(map(params => {
      return +params.id;
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      }))
      .subscribe(recipe => {
        this.recipe = recipe;
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
    // silme işlemi sonrası yönlendirme yazalım
    this.router.navigate(['/recipes']);
  }
}
