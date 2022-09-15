import { connect } from "react-redux";
import Profile from "./Profile";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, null)(Profile);
