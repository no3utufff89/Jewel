import PropTypes from "prop-types";
import styles from "./TableRow.module.scss";

export const TableRow = ({ prod }) => {
  const { id, price, product, brand } = prod;
  const formatedPrice = new Intl.NumberFormat("ru", {
    notation: "standard",
  }).format(price);
  return (
    <tr className={styles.table__row}>
      <td className={styles.tableCell__value + " " + styles.tableCell__id}>
        {id}
      </td>
      <td className={styles.tableCell__value + " " + styles.tableCell__product}>
        {product}
      </td>
      <td className={styles.tableCell__value + " " + styles.tableCell__brand}>
        {!brand && "Без бренда"}
        {brand}
      </td>
      <td className={styles.tableCell__value + " " + styles.tableCell__price}>
        {formatedPrice} ₽
      </td>
    </tr>
  );
};

TableRow.propTypes = {};
