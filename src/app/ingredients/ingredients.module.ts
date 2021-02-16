import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IngredientListComponent } from './ingredient-list.component';

@NgModule({
    declarations: [
        IngredientListComponent,
        IngredientEditComponent
    ],
    imports: [
        RouterModule.forChild(
            [{
                // lazy loading yapıyorsan burasının empty olmasına dikkat et
                path: '',
                component: IngredientListComponent,
            }
            ]
        ),
        SharedModule
    ],
    exports: [
        IngredientListComponent,
        IngredientEditComponent
    ]
})
export class IngredientsModule {

}
