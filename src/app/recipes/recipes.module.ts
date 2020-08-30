import { NgModule } from '@angular/core';
import { RecipeDetailComponent,
         RecipeEditComponent,
         RecipeListComponent,
         RecipesComponent,
         RecipeItemComponent,
         RecipeStartComponent,
         RecipesRoutingModule} from '../recipes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        SharedModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule {

}
