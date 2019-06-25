import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.scss';

const Profile = ({ auth }) => (
    <main className={styles.profile}>
        <Avatar emailHash={auth.emailHash}/>
        <h1>{auth.name}</h1>
    </main>
);

Profile.propTypes = {
    auth: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        emailHash: PropTypes.string.isRequired,
    }).isRequired,
}

export default Profile;
