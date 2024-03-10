import PropTypes from "prop-types";
import styles from "./Table.module.scss";
import { TableRow } from "./TableRow/TableRow";
import { v4 as uuidv4 } from "uuid";
export const Table = ({ products }) => {
  return (
    <table className={styles.table} cellPadding="0" cellSpacing="0">
      <thead className={styles.table__head}>
        <tr className={styles.table__row}>
          <th
            className={
              styles.tableCell +
              " " +
              styles.tableCell_name +
              " " +
              styles.tableCell_id
            }
          >
            ID товара
          </th>
          <th className={styles.tableCell + " " + styles.tableCell_name}>
            Наименование
          </th>
          <th className={styles.tableCell + " " + styles.tableCell_name}>
            Бренд
          </th>
          <th className={styles.tableCell + " " + styles.tableCell_name}>
            Цена
          </th>
        </tr>
      </thead>

      <tbody className={styles.table__body}>
        {products.map((prod) => (
          <TableRow prod={prod} key={prod.id} />
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  products: PropTypes.array,
};
