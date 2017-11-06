import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRecipe from '../store/recipes.reducers';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;

  constructor(private store: Store<fromRecipe.RecipesState>) {
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
}
