import React, { useEffect } from "react";
import styles from "./Profile.module.scss";
import Avatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector(state => state.auth);

  useEffect(() => {
    document.title = `Redux Auth | ${currentUser.name}`;
  });

  return (
    <main className={styles.profile}>
      <Avatar emailHash={currentUser.emailHash} />
      <h1>{currentUser.name}</h1>
    </main>
  );
};

export default Profile;
