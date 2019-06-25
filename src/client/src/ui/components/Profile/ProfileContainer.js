import { connect } from 'react-redux';
import Profile from './Profile';

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(Profile);