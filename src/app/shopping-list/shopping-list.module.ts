import { NgModule } from '@angular/core';
import { ShoppingListComponent, ShoppingEditComponent } from '../shopping-list';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
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
