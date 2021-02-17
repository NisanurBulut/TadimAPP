import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromIngredientActions from '../store/ingredients.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('f', { static: false }) slForm: NgForm;
  constructor(private store: Store<fromApp.AppState>) {
    this.store.select(a => a.ingredients).pipe(
      map((data) => {
        return data.ingredient;
      })
    ).subscribe(data => {
      this.editedItem = data;
      this.initForm();
    });
  }

  ngOnInit() { }
  initForm(): void {
    if (this.editedItem) {
      this.editMode = true;
      console.log(this.editedItem);
      this.slForm.setValue({
        id: this.editedItem.id,
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    }
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode === true) {
      this.store.dispatch(new fromIngredientActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new fromIngredientActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.editedItem = null;
  }
  onDeleteItem() {
    this.store.dispatch(new fromIngredientActions.DeleteIngredient(this.editedItem.id));
    this.onClear();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
