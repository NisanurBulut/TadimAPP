import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
        FormsModule,
        CommonModule,
        RouterModule.forChild(
            [{
                // lazy loading yapıyorsan burasının empty olmasına dikkat et
                path: '',
                component: IngredientListComponent,
            }
            ]
        )
    ],
    exports: [
        IngredientListComponent,
        IngredientEditComponent
    ]
})
export class IngredientsModule {

}
