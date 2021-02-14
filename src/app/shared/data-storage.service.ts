import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';
import * as fromRecipes from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private rs: RecipeService, private store: Store<fromApp.AppState>) { }

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
        return this.http
            .get<Recipe[]>(environment.firebase.dataURL);
            // .pipe(map(recipes => {
            //     return recipes.map(recipe => {
            //         return {
            //             ...recipe,
            //             ingredients: recipe.ingredients ? recipe.ingredients : []
            //         };
            //     });
            // }), tap(resultRecipes => {
            //     // this.rs.setRecipes(resultRecipes);
            //     this.store.dispatch(new fromRecipes.SetRecipes(resultRecipes));
            // }));
    }
}
