import PropTypes from "prop-types";
import styles from "./FilterBlock.module.scss";
import FilterForm from "../FilterForm";

export const FilterBlock = () => {
  return (
    <div className={styles.filterBlock}>
      <p className={styles.filterBlock__title}>Фильтр товаров</p>
      <FilterForm />
    </div>
  );
};

FilterBlock.propTypes = {};
