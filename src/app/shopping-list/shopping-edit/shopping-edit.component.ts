import { Component } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  constructor(private shoppingListService: ShoppingListService) {
  }

  addCurrentIngredient(form: NgForm) {
    const value = form.value;
    this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    form.reset();
  }

}
