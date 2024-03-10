import PropTypes from "prop-types";
import styles from "./SearchComponent.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  activateFilter,
  activateSearch,
  fetchSearchData,
} from "../../store/slice/productsSlice";

export const SearchComponent = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // Отправка формы поиска
  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(activateSearch());
    dispatch(fetchSearchData(data.product));
    reset();
  };
  return (
    <form
      id="searchForm"
      className={styles.searchForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className={styles.searchForm__input}
        type="search"
        placeholder="Поиск по названию товра..."
        {...register("product")}
      />
      <button
        className={`${styles.searchForm__btn} button`}
        type="submit"
        title="Поиск"
      >
        Найти
      </button>
    </form>
  );
};

SearchComponent.propTypes = {};
