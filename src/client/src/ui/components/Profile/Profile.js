import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.scss";
import Avatar from "../Avatar/Avatar";

const Profile = ({ currentUser }) => {
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

Profile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    emailHash: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
