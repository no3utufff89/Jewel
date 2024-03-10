import PropTypes from "prop-types";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  filtred,
  productsData,
} from "../../../store/slice/productsSlice";
import {
  changeOffset,
  decreasePage,
  handleSetPage,
  increasePage,
  limit,
  page,
} from "../../../store/slice/limitsSlice";
import { useEffect } from "react";

export const Pagination = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsData);
  const filterdResults = useSelector(filtred);

  const currentLimit = useSelector(limit);
  const currentPage = useSelector(page);
  const productsToShow = !filterdResults.length ? products : filterdResults;

  const disabled = currentPage === 1 ? true : false;
  let pages = [];
  for (let i = 1; i <= Math.ceil(productsToShow.length / currentLimit); i++) {
    pages.push(i);
  }
  const lastPage = currentPage == pages.length ? true : false;

  const handleNextPage = () => {
    dispatch(increasePage());
  };
  const handlePrevPage = () => {
    dispatch(decreasePage());
  };

  useEffect(() => {
    let newOffet = pages.length * currentLimit;

    if (currentPage === pages.length && productsToShow === products) {
      dispatch(changeOffset(newOffet));
      dispatch(
        fetchProducts({
          limit: 100,
        })
      );
    }
  }, [currentPage]);
  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        className={`${styles.pagination__btn} ${styles.pagination__btn_prev} button`}
        disabled={disabled}
      ></button>
      <div className={styles.pagination__list}>
        {pages.map((link) => (
          <button
            onClick={() => {
              dispatch(handleSetPage(link));
            }}
            className={`${styles.pagination__link}`}
            key={link}
          >
            {link}
          </button>
        ))}
      </div>
      <button
        disabled={lastPage}
        onClick={handleNextPage}
        className={`${styles.pagination__btn} ${styles.pagination__btn_next} button`}
      ></button>
    </div>
  );
};

Pagination.propTypes = {};
