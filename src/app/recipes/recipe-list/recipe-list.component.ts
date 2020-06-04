import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes:Recipe []=[
  // tslint:disable-next-line: no-unused-expression
  // tslint:disable-next-line: align
  new Recipe('Karnıyarık','Karnıyarık yemeği','https://www.misssgibi.com/media/scaled/2019/10/16/karniyarik-tarifi-w1600.jpg')
];
  constructor() { }

  ngOnInit() {
  }

}
