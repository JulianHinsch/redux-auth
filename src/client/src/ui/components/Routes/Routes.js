import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Landing from '../Landing/Landing';
import Login from '../Login/LoginContainer';
import Signup from '../Signup/SignupContainer';
import Profile from '../Profile/ProfileContainer';
import NotFound from '../NotFound/NotFound';

const Routes = (props) => {
    const { auth } = props;
    /* using render props for stateful components
        because of https://github.com/ReactTraining/react-router/issues/6471 */
    return (
        <Switch>
            <Route exact path='/' render={() => auth.isAuthenticated ? <Profile/> : <Landing/>}/>
            <Route path='/login' render={(props) => <Login location={props.location}/>}/>
            <Route path='/signup' render={() => <Signup/>}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

Routes.propTypes = {
    auth: PropTypes.object.isRequired,
}

export default withRouter(connect((state, ownProps) => ({ auth: state.auth}), null)(Routes));
