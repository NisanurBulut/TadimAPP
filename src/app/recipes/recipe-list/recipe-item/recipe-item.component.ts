import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RecipeDetailComponent } from '../../recipe-detail/recipe-detail.component';
import { Recipe } from '../../recipe.model';
import * as fromRecipeActions from '../../store/recipe.actions';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number; // recipe listten input olarak buraya gelecek
  constructor(private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog, public store: Store<fromApp.AppState>) { }
  ngOnInit() {
  }
  openRecipeDetailPopup(item: Recipe): void {
    this.dialog.open(RecipeDetailComponent, {
      disableClose: true,
      panelClass: 'form-dialog',
      data: { id: item.id }
    }).afterClosed().subscribe((res) => {
      console.log('popup kapandı');
    });
  }
  deleteRecipe(item: Recipe): void {
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(item.id));
  }
  editRecipe(item: Recipe) {
    this.router.navigateByUrl('recipes/edit/' + item.id);
  }
}
