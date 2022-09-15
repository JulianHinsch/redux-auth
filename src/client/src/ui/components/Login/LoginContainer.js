import { connect } from "react-redux";
import * as actions from "../../../redux/actions/auth";

import Login from "./Login";

const mapStateToProps = (state, ownProps) => ({
  message: state.auth.message,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logIn: (credentials, redirectTo) =>
    dispatch(actions.logIn({ credentials, redirectTo })),
  setAuth: (auth) => dispatch(actions.setAuth({ auth })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
