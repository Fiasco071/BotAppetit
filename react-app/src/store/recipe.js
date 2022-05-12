const GET_RECIPES = "recipes/GET_RECIPES";
const ADD_RECIPE = 'recipes/ADD_RECIPE';


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



export const getAllRecipes = () => async (dispatch) => {
  const response = await fetch(`/api/recipes/`);

  if (response.ok) {
    const recipes = await response.json();
    dispatch(getRec(recipes));
    return response;
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
    return response;
  }
};



const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RECIPES: {
      const newState = { ...state };
      Object.values(action.payload).forEach((recipe) => newState[recipe.id] = recipe)
      return newState;
    }
    case ADD_RECIPE: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    default:
      return state;
  }
};

export default recipeReducer;
