import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpRequest } from '@angular/common/http';

import * as RecipesActions from '../store/recipes.actions';
import * as fromRecipes from '../store/recipes.reducers';
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

  @Effect({dispatch: false})
  recipeStore = this.actions$
                    .ofType(RecipesActions.STORE_RECIPES)
                    .withLatestFrom(this.store.select('recipes'))
                    .switchMap(([action, state]) => {
                      const req = new HttpRequest('PUT', 'https://ng-course-recipes.firebaseio.com/recipes.json',
                        state.recipes,
                        { reportProgress: true });
                      return this.httpClient.request(req);
                    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipes.RecipesState>) {}
}
