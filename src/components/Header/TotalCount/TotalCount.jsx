import PropTypes from "prop-types";
import styles from "./TotalCount.module.scss";

export const TotalCount = () => (
  <div className={styles.totalCount}>
    <p className={styles.totalCount__text}>
      Всего товаров: <span className={styles.totalCount__number}>9985</span>
    </p>
  </div>
);

TotalCount.propTypes = {};
