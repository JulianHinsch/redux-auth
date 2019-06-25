import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import PropTypes from 'prop-types';
import history from '../../../history';

const Header = ({ auth, logout }) => (
    <header className={styles.header}>
        <nav>
            <Link to='/' className={styles.logo} title='Home'>
                <img 
                    src={require('../../../assets/home.svg')} 
                    alt='Home'/>
            </Link>
            {auth.isAuthenticated ? (
                <ul>
                    <li> 
                        <img 
                            onClick={logOut} 
                            src={require('../../../assets/logout.svg')} 
                            alt='Log Out' 
                            title='Log Out'/>
                    </li>
                </ul>   
            ) : (
                <ul>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/login'>Log In</Link></li>
                </ul>
            )}
        </nav>
    </header>
)

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
}

export default Header;