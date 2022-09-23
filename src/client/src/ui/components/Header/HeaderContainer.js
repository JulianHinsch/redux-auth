import { connect } from "react-redux";
import * as actions from "../../../redux/actions/auth";

import Header from "./Header";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.auth,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logOut: () => dispatch(actions.logOut()),
});

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
