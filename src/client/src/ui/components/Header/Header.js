import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import PropTypes from "prop-types";

const Header = ({ currentUser, logOut }) => (
  <header className={styles.header}>
    <nav>
      <Link to="/" className={styles.logo} title="Home">
        <img src={require("../../../assets/home.svg")} alt="Home" />
      </Link>
      {currentUser.isAuthenticated ? (
        <ul>
          <li>
            <img
              onClick={logOut}
              src={require("../../../assets/logout.svg")}
              alt="Log Out"
              title="Log Out"
            />
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      )}
    </nav>
  </header>
);

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default Header;
