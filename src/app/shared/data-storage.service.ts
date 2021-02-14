import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private rs: RecipeService, private store: Store<fromApp.AppState>) { }

    storeRecipes() {
        const recipes = this.rs.getRecipes();
        console.log(recipes);
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
    }
}
