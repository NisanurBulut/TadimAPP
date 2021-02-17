import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromRecipeActions from '../store/recipe.actions';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          if (this.id) {
            this.editMode = true;
          }
          this.initForm(); // seçileni yükle forma
        }
      );
  }
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit() { }
  onsubmit() {
    const recipeItem = { ...this.recipeForm.value, id: this.id } as Recipe;
    if (this.editMode === true) {
      this.store.dispatch(new fromRecipeActions.UpdateRecipe(recipeItem));
    } else {
      this.store.dispatch(new fromRecipeActions.AddRecipe(recipeItem));
    }
    this.onCancel();
  }
  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  initForm() {
    let recipe: Recipe;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // varsayılan boş olsun istiyoruz
    const recipeIngredients = new FormArray([]);
    if (this.editMode === true) {
      this.storeSub = this.store.select('recipes').pipe(
        map((data) => {
          return data.recipes.find(item => item.id === this.id);
        })).subscribe(dataRecipe => {
          recipe = { ...dataRecipe };
        });
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (const itemr of recipe.ingredients) {
          recipeIngredients.push(new FormGroup(
            {
              name: new FormControl(itemr.name, Validators.required),
              amount: new FormControl(itemr.amount,
                [Validators.required,
                Validators.pattern('^[1-9]+[0-9]*$')])
            }
          ));
        }
      }
    }
    this.recipeForm = new FormGroup(
      {
        name: new FormControl(recipeName, Validators.required),
        imagePath: new FormControl(recipeImagePath, Validators.required),
        description: new FormControl(recipeDescription, Validators.required),
        ingredients: recipeIngredients
      }
    );
  }
  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup(
        {
          name: new FormControl(null, Validators.required),
          amount: new FormControl(null, [Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$')])
        }
      )
    );
  }
  deleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
  onCancel() {
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }
}
