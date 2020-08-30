import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../../recipes';
import { DataStorageService } from 'src/app/shared/data-storage.service';

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
    private dss: DataStorageService) { }

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
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    // if (this.editMode === true) {
    //   this.rpService.updateRecipe(this.id, newRecipe);
    // } else {
    //   this.rpService.addRecipe(newRecipe);
    // }
    // her iki şekilde de yapılabilir aşağıdaki öntemin faydası reactive form kullanılmasından dolayıdır
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

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // varsayılan boş olsun istiyoruz
    let recipeIngredients = new FormArray([]);
    if (this.editMode === true) {
      const recipe = this.rpService.getRecipe(this.id);

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
