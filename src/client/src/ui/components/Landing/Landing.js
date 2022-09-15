import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Landing.module.scss";

const Landing = () => {
  useEffect(() => {
    document.title = "Redux Auth";
  }, []);

  return (
    <main className={styles.landing}>
      <h1>Welcome!</h1>
      <p>
        Please <Link to="/signup">sign up</Link> or&nbsp;
        <Link to="/login">log in</Link>!
      </p>
    </main>
  );
};

export default Landing;
