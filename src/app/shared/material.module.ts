import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
      MatCardModule,
      MatDialogModule,
      MatButtonModule,
      MatGridListModule,
      MatSnackBarModule,
      MatSelectModule,
      MatFormFieldModule
  ],
  exports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
