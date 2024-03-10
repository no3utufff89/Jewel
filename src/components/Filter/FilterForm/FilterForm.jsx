import PropTypes from "prop-types";
import styles from "./FilterForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { brandsData } from "../../../store/slice/brandSlice";
import BrandCheckbox from "./../BrandCheckbox/index";
import FilterBtn from "./../FilterBtn/index";
import { fetchFiltredData, params } from "../../../store/slice/productsSlice";
import { useForm } from "react-hook-form";
import { filterData } from "../../../api/api";

export const FilterForm = (checked) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const filterParams = useSelector(params);
  const brands = useSelector(brandsData);
  const dispatch = useDispatch();
  const status = !filterParams.length ? true : false;

  // Отправка формы
  const onSubmit = (data) => {
    data.params = filterParams;
    const brands = data.params;
    // brands.map((el) => dispatch(fetchFiltredData(el)));
    let arr = [];
    brands.forEach((el) => {
      arr.push(filterData(el));
    });
    const func = async (arr) => {
      try {
        const ids = (await Promise.all(arr)).flat(Infinity);
        dispatch(fetchFiltredData(ids));
        return ids;
      } catch (error) {
        console.error(error);
      }
    };
    func(arr);
  };
  return (
    <form
      id="filterForm"
      className={styles.filterForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className={styles.fieldset}>
        <legend className={styles.fieldset__legend}>Бренд</legend>
        {brands.map((item) => (
          <BrandCheckbox brand={item} checked={checked} key={item} />
        ))}
      </fieldset>
      <FilterBtn form="filterForm" status={status} />
    </form>
  );
};

FilterForm.propTypes = {};
