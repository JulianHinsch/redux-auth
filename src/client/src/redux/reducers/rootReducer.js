import { combineReducers } from "redux";
import { CLEAR_STORE } from "../actions/data";

import authReducer from "./auth";

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined;
  }

  return combineReducers({
    auth: authReducer,
  })(state, action);
};

export default rootReducer;
