import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
      MatCardModule,
      MatDialogModule,
      MatButtonModule,
      MatGridListModule,
      MatSnackBarModule
  ],
  exports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
