import PropTypes from "prop-types";
import styles from "./App.module.scss";
import { Header } from "./../Header/Header";
import { Content } from "./../Content/Content";

export const App = () => (
  <div className={styles.container}>
    <Header />
    <Content />
  </div>
);

App.propTypes = {};
