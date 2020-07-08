import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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
  initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    if (this.editMode === true) {
      const recipe = this.rpService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName),
        'imagePath': new FormControl(recipeImagePath),
        'description': new FormControl(recipeDescription)
      }
    );
  }
}
