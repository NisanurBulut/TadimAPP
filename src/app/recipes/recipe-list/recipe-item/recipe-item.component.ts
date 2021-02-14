import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RecipeDetailComponent } from '../../recipe-detail/recipe-detail.component';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number; // recipe listten input olarak buraya gelecek
  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }
  openRecipeDetailPopup(item: Recipe): void {
    this.dialog.open(RecipeDetailComponent, {
      disableClose: true,
      panelClass: 'form-dialog',
      data: {}
    }).afterClosed().subscribe((res) => {
      console.log('popup kapandı');
    });
  }
}
