import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private rs: RecipeService, private as: AuthService) { }
    storeRecipes() {
        const recipes = this.rs.getRecipes();

        return this.http.put(environment.firebase.dataURL, recipes)
            .subscribe(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
    }
    fetchRecipes() {
        return this.as.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[]>(environment.firebase.dataURL,
                {
                    params: new HttpParams().set('auth', user.getToken())
                });
        }), map(recipes => {
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
