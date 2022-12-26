import { AUTH } from "../../actions/auth";
import { API_SUCCESS } from "../../actions/api";

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    switch (action.type) {
      case `${AUTH} ${API_SUCCESS}`:
        if (action.meta.callback) {
          action.meta.callback();
        }
        break;
      default:
        break;
    }
  };
