import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';

const Avatar = ({ emailHash }) => (
     <div 
        style={{
            backgroundImage: `url(https://www.gravatar.com/avatar/${emailHash})`,
            backgroundSize: 'cover',        
        }}
        className={styles.avatar}/>
)

Avatar.propTypes = {
    emailHash: PropTypes.string.isRequired,
}

export default Avatar;
