import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as shoppingListActions from '../store/shopping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', { static: false }) slForm: NgForm;
  constructor(private slService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit() {
    // düzenlenmek istenen nesneye abona olalım
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editedItem = this.slService.getIngredient(index);
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode === true) {
      // güncelle
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // ekleme yap
      //  this.slService.addIngredient(newIngredient);
      // dispathch
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;

  }
  onDeleteItem() {
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
