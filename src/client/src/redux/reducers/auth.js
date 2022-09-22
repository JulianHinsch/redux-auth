import { SET_CURRENT_USER } from "../actions/auth";

const defaultState = {
  id: null,
  isAuthenticated: false,
  name: null,
  emailHash: null,
  message: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const user = action.payload;
      return { ...state, ...user };
    default:
      return state;
  }
};
