const GET_RECIPES = "recipes/GET_RECIPES";
const ADD_RECIPE = 'recipes/ADD_RECIPE';
const DELETE_RECIPE = 'recipes/DELETE_RECIPE';

const getRec = (recipes) => {
  return {
    type: GET_RECIPES,
    payload: recipes,
  };
};

const addRec = (recipe) => {
  return {
    type: ADD_RECIPE,
    payload: recipe
  }
}

const delRec = (recipe) => {
  return {
    type:DELETE_RECIPE,
    payload:recipe
  }
}



export const getAllRecipes = () => async (dispatch) => {
  const response = await fetch(`/api/recipes/`);

  if (response.ok) {
    const recipes = await response.json();
    dispatch(getRec(recipes));
    return recipes;
  }
};

export const addARecipe = (data) => async (dispatch) => {
  const response = await fetch(`/api/recipes/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const recipe = await response.json();
    dispatch(addRec(recipe));
    return recipe;
  }  else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const updateARecipe = (id,data) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${id}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const recipe = await response.json();
    dispatch(addRec(recipe));
    return recipe;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const delARecipes = (id) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${id}/delete`);

  if (response.ok) {
    const recipe = await response.json();
    dispatch(delRec(recipe));
    return recipe;
  }
};

const initialState = { };

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES: {
      const newState = {};
      action.payload.recipes.forEach(recipe => newState[recipe.id] = recipe)
      return newState;
    }
    case ADD_RECIPE: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_RECIPE: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

export default recipeReducer;
