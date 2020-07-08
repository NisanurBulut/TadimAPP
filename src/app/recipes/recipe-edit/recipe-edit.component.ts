import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private rpService: RecipeService) { }

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
    console.log(this.recipeForm);
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
              'name': new FormControl(itemr.name),
              'amount': new FormControl(itemr.amount)
            }
          ));
        }
      }
    }
    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName),
        'imagePath': new FormControl(recipeImagePath),
        'description': new FormControl(recipeDescription),
        'ingredients': recipeIngredients
      }
    );
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(
        {
          'name' : new FormControl(),
          'amount' : new FormControl()
        }
      )
    );
  }
  deleteIngredient(index:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
