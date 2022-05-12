const GET_COMMENTS = "comments/GET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments,
  };
};

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment
  };
};

const deleteComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    payload: comment
  }
}

export const getAllComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(getComments(comments));
    return comments;
  }
};


export const addAComment = (data) => async (dispatch) => {
  const response = await fetch(`/api/comments/${data.recipe_id}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(addComment(comment));
    return comment;
  }
};

//////////////////////////////////////////
export const updateAComment = (data) => async (dispatch) => {
  const response = await fetch(`/api/comments/${data.recipe_id}/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(addComment(comment));
    return comment;
  }
};
///////////////////////////////////////////////////



export const deleteAComment = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}/delete`, {
    method: "GET"
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(deleteComment(comment));
    return comment;
  }
};




const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS: {
      const newState = {};
      action.payload.comments.forEach((comment) => newState[comment.id] = comment)
      return newState;
    }
    case ADD_COMMENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }

    default:
      return state;
  }
};

export default commentReducer;