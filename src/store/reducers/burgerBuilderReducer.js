import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  loading: false,
  error: false
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  });
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  });
  return updateObject(state, updatedState);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false
  });
};

const fetchIngredients = (state, action) => {
  return updateObject(state, {
    error: true
  });
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: 
      return fetchIngredients(state, action);
    default:
      return state;
  }
};

export default burgerBuilderReducer;
