import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../redux/actions/auth";

import HomeIcon from "../../../assets/home.svg";
import LogOutIcon from "../../../assets/logout.svg";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(authActions.logOut({ callback: () => navigate("/") }));
  }

  const currentUser = useSelector((state) => state.auth);

  return (
    <header className={styles.header}>
      <nav>
        <Link to="/" className={styles.logo} title="Home">
          <img src={HomeIcon} alt="Home" />
        </Link>
        {currentUser.isAuthenticated ? (
          <ul>
            <li>
              <img
                onClick={logOut}
                src={LogOutIcon}
                alt="Log Out"
                title="Log Out"
              />
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/signup" state={{ from: location.pathname }}>Sign Up</Link>
            </li>
            <li>
              <Link to="/login" state={{ from: location.pathname }}>Log In</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
