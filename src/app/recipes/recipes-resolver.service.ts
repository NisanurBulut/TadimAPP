import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dss: DataStorageService, private rs: RecipeService) { }
    resolve(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) {
        const recipes = this.rs.getRecipes();
        console.log(recipes);
        if (recipes.length === 0) {
            return this.dss.fetchRecipes();
        } else {
            return recipes;
        }
    }
}
