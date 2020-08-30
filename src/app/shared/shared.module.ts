import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent, DropdownDirective } from '../shared';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoadingSpinnerComponent,
        DropdownDirective
    ]
})
export class SharedModule { }
