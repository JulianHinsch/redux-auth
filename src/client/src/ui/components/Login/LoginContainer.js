import { connect } from "react-redux";
import * as actions from "../../../redux/actions/auth";

import Login from "./Login";

const mapStateToProps = (state, ownProps) => ({
  message: state.auth.message,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logIn: (credentials, redirectTo) =>
    dispatch(actions.logIn({ credentials, redirectTo })),
  setCurrentUser: (auth) => dispatch(actions.setCurrentUser({ auth })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
