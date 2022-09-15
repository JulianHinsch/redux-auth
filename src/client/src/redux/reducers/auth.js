import { SET_AUTH } from "../actions/auth";

const defaultState = {
  id: null,
  isAuthenticated: false,
  name: null,
  emailHash: null,
  message: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_AUTH:
      const auth = action.payload;
      return { ...state, ...auth };
    default:
      return state;
  }
};
