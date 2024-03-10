import axios from "axios";
import md5 from "md5";
// =================== Адрес API
export const API_URL = "http://api.valantis.store:40000/";

// =================== Пароль API
export const API_PASSWORD = "Valantis";

const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const hash = md5(`${API_PASSWORD}_${dateStamp}`);

// Запрос всех id товаров в пределах переданного лимита

export const getIds = async (limit, offset) => {
  const data = await axios.post(
    `${API_URL}`,
    {
      action: "get_ids",
      params: {
        limit: limit,
        offset: offset,
      },
    },
    {
      headers: {
        "X-Auth": hash,
      },
    }
  );
  return [...new Set(data.data.result)];
};

// Запрос товаров с нужными id

export const getItems = async (ids) => {
  const products = await axios.post(
    `${API_URL}`,
    {
      action: "get_items",
      params: {
        ids: ids,
      },
    },
    {
      headers: {
        "X-Auth": hash,
      },
    }
  );
  const allAproducts = products.data.result;
  const filterdProducts = allAproducts.reduce((acc, curr) => {
    if (!acc.find((item) => item.id == curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return filterdProducts;
};

// Запрос брендов

export const getBrands = async (limit) => {
  const data = await axios.post(
    `${API_URL}`,
    {
      action: "get_fields",
      params: { field: "brand", offset: 0 },
    },
    {
      headers: {
        "X-Auth": hash,
      },
    }
  );
  return [...new Set(data.data.result)];
};

// Фильтрация

export const filterData = async (param) => {
  const data = await axios.post(
    `${API_URL}`,
    {
      action: "filter",
      params: { brand: param },
    },
    {
      headers: {
        "X-Auth": hash,
      },
    }
  );
  return [...new Set(data.data.result)];
};

export const searchData = async (param) => {
  const data = await axios.post(
    `${API_URL}`,
    {
      action: "filter",
      params: { product: param },
    },
    {
      headers: {
        "X-Auth": hash,
      },
    }
  );
  return [...new Set(data.data.result)];
};
