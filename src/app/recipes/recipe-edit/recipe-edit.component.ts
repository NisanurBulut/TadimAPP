import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromRecipeActions from '../store/recipe.actions';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  ingredientList: Ingredient[];
  recipeItem: Recipe;
  recipeIngredients = new FormArray([]);
  private storeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {


    this.route.params
      .pipe(
        tap(() => {
          this.getIngredients();
        })
      ).subscribe(
        (params: Params) => {
          this.id = +params.id;
          if (this.id) {
            this.editMode = true;
            this.getRecipeData();
            this.initForm(); // seçileni yükle forma
          } else {
            this.createForm();
          }
        }
      );
  }
  getRecipeData() {
    this.storeSub = this.store.select('recipes').pipe(
      map((data) => {
        return data.recipes.find(item => item.id === this.id);
      })).subscribe(dataRecipe => {
        this.recipeItem = { ...dataRecipe } as Recipe;
      });
  }
  getIngredients(): void {
    this.store.select(a => a.ingredients).pipe(
      map((data) => {
        return data.ingredients;
      })
    ).subscribe(data => {
      this.ingredientList = data;
    });
  }
  createForm(): void {
    this.recipeForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        imagePath: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        ingredients: new FormArray([])
      }
    );
  }
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit() { }
  onsubmit($event) {
    $event.preventDefault();
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
  prepareIngredientsForm(): void {
    if (this.recipeItem.ingredients) {
      for (const itemr of this.recipeItem.ingredients) {
        this.recipeIngredients.push(new FormGroup(
          {
            ingredient: new FormControl(itemr['ingredient'].id, Validators.required)
          }
        ));
      }
    }
  }
  initForm() {
    this.prepareIngredientsForm();
    this.recipeForm = new FormGroup(
      {
        name: new FormControl(this.recipeItem.name, Validators.required),
        imagePath: new FormControl(this.recipeItem.imagePath, Validators.required),
        description: new FormControl(this.recipeItem.description, Validators.required),
        ingredients: this.recipeIngredients
      }
    );
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup(
        {
          ingredient: new FormControl(null, Validators.required)
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
