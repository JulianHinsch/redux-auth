import _ from "lodash";
import cookies from "js-cookie";
import {
  AUTH,
  LOG_IN,
  SIGN_UP,
  LOG_OUT,
  GET_CURRENT_USER,
  setCurrentUser,
} from "../../actions/auth";
import { API_SUCCESS, API_ERROR, apiRequest } from "../../actions/api";
import { clearStore } from "../../actions/data";

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    switch (action.type) {
      case LOG_IN:
        const credentials = action.payload;
        next(
          apiRequest({
            data: credentials,
            method: "POST",
            url: "/login",
            timeout: 3000,
            feature: AUTH,
            callback: action.meta.callback,
          })
        );
        break;
      case SIGN_UP:
        const user = action.payload;
        next(
          apiRequest({
            data: user,
            method: "POST",
            url: "/signup",
            timeout: 3000,
            feature: AUTH,
            callback: action.meta.callback,
          })
        );
        break;
      case LOG_OUT:
        next(
          apiRequest({
            method: "POST",
            url: "/logout",
            timeout: 3000,
            feature: AUTH,
            callback: action.meta.callback,
          })
        );
        break;
      case `${AUTH} ${API_ERROR}`:
        const message = _.get(action, "payload.response.data.message");
        if (message) {
            next(setCurrentUser({ user: { message } }));
        }
        break;
      case `${AUTH} ${API_SUCCESS}`:
      case GET_CURRENT_USER:
        const id_token = cookies.get("id_token");
        if (id_token) {
          const payload = id_token.split('.')[1];
          const { id, name, emailHash, exp } = JSON.parse(
            window.atob(payload)
          );
          // exp is in seconds not milliseconds
          if (exp * 1000 > new Date().getTime()) {
            const user = {
              id,
              name,
              emailHash,
              isAuthenticated: true,
              message: null,
            };
            next(setCurrentUser({ user }));
            break;
          }
        }
        // clear the store when the user logs out
        next(clearStore());
        break;
      default:
        break;
    }
  };
