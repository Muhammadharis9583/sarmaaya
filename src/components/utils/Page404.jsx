import { NavLink } from "react-router-dom";
import styles from "./404.module.css";

const Page404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>404</div>
      <div className={styles.message}>Sorry, the page you requested could not be found.</div>
      <NavLink className={styles.link} to="/symbols">
        Go back to homepage
      </NavLink>
    </div>
  );
};

export default Page404;
