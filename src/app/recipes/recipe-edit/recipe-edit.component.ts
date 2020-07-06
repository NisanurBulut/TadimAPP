import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id: number;
editMode:false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // id değerini almak için
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // bir id değeri varsa düzenleme modundadır
        this.editMode = params['id'] != null;
      }
    );
  }

}
