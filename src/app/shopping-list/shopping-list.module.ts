import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        RouterModule.forChild(
            [{
                // lazy loading yapıyorsan burasının empty olmasına dikkat et
                path: '',
                component: ShoppingListComponent,
            }
            ]
        ),
        SharedModule
    ],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent
    ]
})
export class ShoppingListModule {

}
