const GET_COMMENTS = "comments/GET_COMMENTS";

const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments,
  };
};



export const getAllComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(getComments(comments));
    return response;
  }
};


const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS: {
      const newState = { ...state };
      Object.values(action.payload).forEach((comment) => newState[comment.id] = comment)
      return newState;
    }
    default:
      return state;
  }
};

export default commentReducer;