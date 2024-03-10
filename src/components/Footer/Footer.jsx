import PropTypes from "prop-types";
import styles from "./Footer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeLimit, limit } from "../../store/slice/limitsSlice";
import Pagination from "./Pagination";

export const Footer = () => {
  const dispatch = useDispatch();
  const currentLimit = useSelector(limit);

  // Изменениение состояний селектов
  const handleLimitChange = (event) => {
    dispatch(changeLimit(event.target.value));
  };
  return (
    <div className={styles.footer}>
      <div className={styles.footer__sort}>
        <span className={styles.footer__limitsText}>
          Показывать на странице:
        </span>
        <select
          className={styles.footer__select}
          onChange={handleLimitChange}
          defaultValue={currentLimit}
        >
          <option id="20">20</option>
          <option id="50">50</option>
        </select>
      </div>
      <Pagination />
    </div>
  );
};

Footer.propTypes = {};
