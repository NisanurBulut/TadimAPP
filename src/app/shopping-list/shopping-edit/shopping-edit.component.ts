import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
@ViewChild('amountInput', {static: false}) amountRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  onAddItem(){
    const ingName=this.nameInputRef.nativeElement.value;
    const ingAmount=this.amountRef.nativeElement.value;

  const newIngredient = new Ingredient(ingName,ingAmount);
  }
}
