import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

import * as RecipesActions from '../store/recipes.actions';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipesEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipesActions.FETCH_RECIPES)
    .switchMap((action: RecipesActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-course-recipes.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map((recipes) => {
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipesActions.SET_RECIPES,
        payload: recipes
      }
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}
}
