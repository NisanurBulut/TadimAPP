import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number; // recipe listten input olarak buraya gelecek
  constructor() { }
  ngOnInit() {
  }
  openRecipeDetailPopup(item: any): void {
    debugger;
    console.log(item);
  }
}
