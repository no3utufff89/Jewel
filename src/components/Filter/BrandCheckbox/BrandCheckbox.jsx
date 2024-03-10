import PropTypes from "prop-types";
import styles from "./BrandCheckbox.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeParams, params } from "../../../store/slice/productsSlice";

export const BrandCheckbox = (item) => {
  const brandTitle = item.brand ? item.brand : "Без бренда";
  const dispatch = useDispatch();
  const param = useSelector(params);
  const handleChangeParam = (event) => {
    dispatch(changeParams(event.target.value));
  };

  return (
    <label className={styles.label}>
      {brandTitle}
      <input
        onChange={handleChangeParam}
        type="checkbox"
        className={styles.checkbox}
        value={brandTitle}
        checked={param.includes(brandTitle)}
      />
    </label>
  );
};

BrandCheckbox.propTypes = {
  item: PropTypes.string,
};
