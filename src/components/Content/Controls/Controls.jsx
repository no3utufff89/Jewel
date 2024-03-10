import PropTypes from "prop-types";
import { FaFilter } from "react-icons/fa";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { LuSearchX } from "react-icons/lu";
import styles from "./Controls.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  activateFilter,
  activateSearch,
  clearFilterParams,
  isActive,
  isActiveSearch,
  params,
} from "../../../store/slice/productsSlice";
import SearchComponent from "./../../SearchComponent/index";

export const Controls = () => {
  const dispatch = useDispatch();
  const isActiveFilter = useSelector(isActive);
  const filterParams = useSelector(params);
  const isSearchActive = useSelector(isActiveSearch);

  const handleFilterOpen = () => {
    dispatch(activateFilter());
  };
  const handleClearParams = () => {
    dispatch(clearFilterParams());
  };
  const hadleSearchReset = () => {
    dispatch(activateSearch());
  };

  const text = !isActiveFilter ? "Фильтр" : "Закрыть фильтр";
  const cancelText = "Сбросить фильтр";
  return (
    <div className={styles.controls}>
      <SearchComponent />
      {filterParams.length > 0 && (
        <button
          className={`${styles.controls__btn} button`}
          title="Отменить фильтр"
          onClick={handleClearParams}
        >
          <MdOutlineFilterAltOff color="#6e6893" /> {cancelText}
        </button>
      )}
      <button
        className={`${styles.controls__btn} button`}
        onClick={handleFilterOpen}
        title="Фильтр"
      >
        <FaFilter color="#6e6893" /> {text}
      </button>
      {isSearchActive && (
        <button
          className={`${styles.controls__btn} button`}
          onClick={hadleSearchReset}
          title="поиск"
        >
          <LuSearchX color="#6e6893" /> Отменить поиск
        </button>
      )}
    </div>
  );
};

Controls.propTypes = {};
