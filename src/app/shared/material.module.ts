import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  imports: [
      MatCardModule,
      MatDialogModule,
      MatButtonModule,
      MatGridListModule,
      MatSnackBarModule,
      MatSelectModule,
      MatFormFieldModule,
      MatInputModule
  ],
  exports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }
