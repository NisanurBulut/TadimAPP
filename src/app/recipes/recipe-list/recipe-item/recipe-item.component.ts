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
    const dialogRef = this.dialog.open(RecipeDetailComponent, {
      width: '250px',
      data: { id: item.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
