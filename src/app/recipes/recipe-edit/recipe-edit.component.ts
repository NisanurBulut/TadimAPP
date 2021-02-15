import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';
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

  ngOnInit() {
  }
  onsubmit() {
    if (this.editMode === true) {
      this.store.dispatch(new fromRecipeActions.UpdateRecipe({ index: this.id, newRecipe: this.recipeForm.value }));
    } else {
      console.log(this.recipeForm.value);
      this.store.dispatch(new fromRecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  initForm() {
    let recipe: Recipe;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // varsayılan boş olsun istiyoruz
    let recipeIngredients = new FormArray([]);
    if (this.editMode === true) {
      this.storeSub = this.store.select('recipes').pipe(
        map((data) => {
          return data.recipes.find((recipe) => {
            return recipe.id === this.id
          });
        })).subscribe(dataRecipe => {
          console.log(dataRecipe);
          recipe = { ...dataRecipe };
        });
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let itemr of recipe.ingredients) {
          recipeIngredients.push(new FormGroup(
            {
              'name': new FormControl(itemr.name, Validators.required),
              'amount': new FormControl(itemr.amount,
                [Validators.required,
                Validators.pattern("^[1-9]+[0-9]*$")])
            }
          ));
        }
      }
    }
    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients
      }
    );
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(
        {
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required,
          Validators.pattern("^[1-9]+[0-9]*$")])
        }
      )
    );
  }
  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel() {
    //bir önceki ekrana gel
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }
}
