const GET_INGREDIENTS = "ingredients/GET_INGREDIENTS";

const getIng = (ingredients) => {
  return {
    type: GET_INGREDIENTS,
    payload: ingredients,
  };
};



export const getAllIngredients = () => async (dispatch) => {
  const response = await fetch(`/api/ingredients/`);

  if (response.ok) {
    const ingredients = await response.json();
    dispatch(getIng(ingredients));
    return ingredients;
  }
};


const ingredientReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      const newState = { ...state };
      action.payload.ingredients.forEach((ingredient) => newState[ingredient.id] = ingredient)
      return newState;
    }
    default:
      return state;
  }
};

export default ingredientReducer;
