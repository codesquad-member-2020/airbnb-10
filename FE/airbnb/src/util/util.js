const _ = {
  getCurrentDate: () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}-${month}-${day}`;
  },
  getTomorrowDate: () => {
    const today = new Date();
    const tomorrow = new Date(today.valueOf() + 24 * 60 * 60 * 1000);
    const year = tomorrow.getFullYear();
    const month = tomorrow.getMonth() + 1;
    const day = tomorrow.getDate();

    return `${year}-${month}-${day}`;
  },
  createInitialRequsetURL: () => {
    const ROOMS_DB_HOST = process.env.REACT_APP_ROOMS_DB_HOST;

    const requsetURL =
      ROOMS_DB_HOST +
      `?checkIn=${_.getCurrentDate()}&checkOut=${_.getTomorrowDate()}&adults=1&priceMin=0&priceMax=500000`;

    return requsetURL;
  },
};

export const getDate = (date) => {
  const today = new Date();
  today.setDate(today.getDate() + date);

  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

export const getCurrency = (stringNum) => {
  return parseInt(stringNum).toLocaleString();
};

export const getInitialUrl = () => {
  const today = getDate(0);
  const tomorrow = getDate(1);
  const initialUrl = `${process.env.REACT_APP_ROOMS_DB_HOST}checkIn=${today}&checkOut=${tomorrow}`;
  return initialUrl;
};

export default _;
