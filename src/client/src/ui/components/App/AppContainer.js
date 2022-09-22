import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../redux/actions/auth";

import App from "./App";

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCurrentUser: () => dispatch(actions.getCurrentUser()),
});

export default withRouter(connect(null, mapDispatchToProps, null)(App));
