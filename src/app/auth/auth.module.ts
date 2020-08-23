import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{
        path: 'auth',
        component: AuthComponent,
    }])],
    exports: []
})
export class AuthModule { }
