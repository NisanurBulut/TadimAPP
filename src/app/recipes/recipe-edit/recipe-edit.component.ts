import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private rpService: RecipeService,
    private router: Router,
    private dss: DataStorageService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // id değerini almak için
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // bir id değeri varsa düzenleme modundadır
          this.editMode = params['id'] != null;
          this.initForm(); // seçileni yükle forma
        }
      );
  }
  onsubmit() {
    if (this.editMode === true) {
      this.rpService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.rpService.addRecipe(this.recipeForm.value);
      this.dss.storeRecipes();
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
      // const recipe = this.rpService.getRecipe(this.id);
      this.store.select('recipes').pipe(
        map((data) => {
          return data.recipes.find((recipe, index) => {
            return index === this.id
          });
        })).subscribe(dataRecipe => {
          recipe = { ...dataRecipe };
        });
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      console.log(recipe);
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
