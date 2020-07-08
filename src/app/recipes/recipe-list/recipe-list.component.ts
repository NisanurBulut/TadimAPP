import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
recipes: Recipe [];
subscription: Subscription;
  constructor(private rService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  this.subscription = this.rService.recipesChanged.subscribe(
      (recipeList:Recipe[])=>{
        this.recipes = recipeList;
      }
    );
    this.recipes = this.rService.getRecipes();
  }
  ngOnDestroy() {
   this.subscription.unsubscribe();
  }
  onNewRecipe() {
    this.router.navigate(['yeni'], { relativeTo: this.route });
  }
}
