import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private rs: RecipeService) { }
    storeRecipes() {
        const recipes = this.rs.getRecipes();
        console.log('servise geldi');
        return this.http.put('https://tadimapp-ca4fc.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
    }
    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://tadimapp-ca4fc.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                return recipes.map(recipe => {
                    return {
                         ...recipe,
                         ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }), tap(resultRecipes => {
                    this.rs.setRecipes(resultRecipes);
                }));
    }
}
