import PropTypes from "prop-types";
import styles from "./FilterBtn.module.scss";

export const FilterBtn = ({ form, status }) => (
  <button
    className={styles.applyBtn + " " + "btn"}
    type="submit"
    form={form}
    disabled={status}
  >
    Применить
  </button>
);

FilterBtn.propTypes = {};
