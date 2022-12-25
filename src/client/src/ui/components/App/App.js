import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../redux/actions/auth";

import Landing from "../Landing/Landing";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import NotFound from "../NotFound/NotFound";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../Header/Header";

import "../../styles/global.scss";
import styles from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.getCurrentUser())
  }, []);

  const currentUser = useSelector((state) => state.auth);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={currentUser.isAuthenticated ? <Profile /> : <Landing />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
