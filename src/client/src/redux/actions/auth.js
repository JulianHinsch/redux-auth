export const AUTH = "[Auth]";

export const LOG_IN = `${AUTH} LOG_IN`;
export const SIGN_UP = `${AUTH} SIGN_UP`;
export const LOG_OUT = `${AUTH} LOG_OUT`;
export const GET_CURRENT_USER = `${AUTH} GET_CURRENT_USER`;
export const SET_CURRENT_USER = `${AUTH} SET_CURRENT_USER`;

export const logIn = ({ credentials, callback }) => ({
  type: LOG_IN,
  payload: credentials,
  meta: {
    callback,
  },
});

export const signUp = ({ user, callback }) => ({
  type: SIGN_UP,
  payload: user,
  meta: {
    callback,
  }
});

export const logOut = ({ callback }) => ({
  type: LOG_OUT,
  meta: {
    callback,
  }
});

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
});

export const setCurrentUser = ({ user }) => ({
  type: SET_CURRENT_USER,
  payload: user,
  meta: {
    feature: AUTH,
  },
});
