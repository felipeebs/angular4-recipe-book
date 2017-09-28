import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipesActions from './recipes.actions';

// AKA FeatureState
export interface RecipesState {
  recipes: State;
}

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: [
    new Recipe('Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Cheese', 1),
        new Ingredient('Meat', 1)
      ])
  ]
};

export function recipesReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const originalRecipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...originalRecipe,
        ...action.payload.recipe
      };
      const recipeList = [...state.recipes];
      recipeList[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipeList
      };
    case RecipesActions.DELETE_RECIPE:
      const stateRecipes = [...state.recipes];
      stateRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: stateRecipes
      };
    default:
      return state;
  }
}
