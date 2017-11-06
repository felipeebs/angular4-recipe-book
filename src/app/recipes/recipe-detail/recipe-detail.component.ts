import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipes.reducers';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.RecipesState>) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>  {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes')
    });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: fromRecipe.State) => {
          this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients))
        });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes']);
  }
}
