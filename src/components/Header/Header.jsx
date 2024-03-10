import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import { TotalCount } from "./TotalCount/TotalCount";

export const Header = () => (
  <div className={styles.header}>
    <h1 className={styles.header__title}>Ювелирные изделия</h1>
    <TotalCount />
  </div>
);

Header.propTypes = {};
