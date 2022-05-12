const GET_RECIPES = "recipes/GET_RECIPES";

const getRec = (recipes) => {
  return {
    type: GET_RECIPES,
    payload: recipes,
  };
};



export const getAllRecipes = () => async (dispatch) => {
  const response = await fetch(`/api/recipes/`);

  if (response.ok) {
    const recipes = await response.json();
    dispatch(getRec(recipes));
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
    default:
      return state;
  }
};

export default recipeReducer;
