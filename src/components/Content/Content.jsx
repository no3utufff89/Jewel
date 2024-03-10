import PropTypes from "prop-types";
import styles from "./Content.module.scss";
import Controls from "./Controls";
import { Table } from "./Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  productsData,
  sliceProducts,
  status,
} from "../../store/slice/productsSlice";
import { PacmanLoader } from "react-spinners";
import { Footer } from "../Footer/Footer";
import { fetchBrands } from "../../store/slice/brandSlice";
import { limit, offset, page } from "../../store/slice/limitsSlice";
import { FilterBlock } from "../Filter/FilterBlock/FilterBlock";
import { filtred, isActive } from "../../store/slice/productsSlice";
import { searchData } from "../../api/api";

export const Content = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsData);
  const filterdResults = useSelector(filtred);
  const loading = useSelector(status);
  const currentLimit = useSelector(limit);
  const currentOffset = useSelector(offset);
  const currentPage = useSelector(page);
  const isActiveFilter = useSelector(isActive);
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(
      fetchProducts({
        limit: 100,
      })
    );
  }, []);
  const lastPostIndex = currentPage * currentLimit;
  const firstPostIndex = lastPostIndex - currentLimit;
  const postsdata = !filterdResults.length ? products : filterdResults;
  const currentPosts = postsdata.slice(firstPostIndex, lastPostIndex);
  const productsToShow = !filterdResults.length ? currentPosts : currentPosts;

  return (
    <div className={styles.content}>
      <Controls />
      {isActiveFilter && <FilterBlock />}

      <div className={styles.wrapper}>
        {loading === "loading" ? (
          <div className={styles.preloader}>
            <PacmanLoader size={35} color="#c6c2de" />
          </div>
        ) : (
          <Table products={productsToShow} />
        )}
      </div>
      <Footer />
    </div>
  );
};

Content.propTypes = {};
