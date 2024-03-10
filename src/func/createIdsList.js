export const createIdsList = async (arr) => {
  try {
    const list = (await Promise.all(arr)).flat(Infinity);
    console.log(list);
    return list;
  } catch (error) {
    console.error(error);
  }
};
