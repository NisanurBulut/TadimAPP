import { Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipe:Recipe;

  constructor(private rService:RecipeService) { }

  ngOnInit() {
  }
  onSelected(){
    //servise dinleyecek eleman gonderildi
this.rService.recipeSelected.emit(this.recipe);
  }
}
