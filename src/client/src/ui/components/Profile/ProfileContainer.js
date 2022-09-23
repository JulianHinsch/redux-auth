import { connect } from "react-redux";
import Profile from "./Profile";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.auth,
});

export default connect(mapStateToProps, null)(Profile);
