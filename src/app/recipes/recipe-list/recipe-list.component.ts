import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) {
      if (!this.recipes) {
        this.store.select('recipes')
          .pipe(
            takeUntil(this._unsubscribeAll),
            map((data) => data.recipes))
          .subscribe(
            (recipes: Recipe[]) => {
              this.recipes = recipes;
            }
          );
      }
  }

  ngOnInit() {
  }
  ngOnDestroy() {

  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
