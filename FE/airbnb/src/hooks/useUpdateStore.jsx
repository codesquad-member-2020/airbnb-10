import { setStartDate, setEndDate } from "../modules/date.js";
import { setPersonnelCount } from "../modules/personnel.js";
import { setPrices } from "../modules/price.js";
import moment from "moment";

const useUpdateStore = (dispatch, parsedQueryString) => {
  const {
    checkIn,
    checkOut,
    adults,
    children,
    infants,
    priceMin,
    priceMax,
  } = parsedQueryString;

  checkIn && dispatch(setStartDate(moment(checkIn)));
  checkOut && dispatch(setEndDate(moment(checkOut)));
  adults && dispatch(setPersonnelCount("adultCount", Number(adults)));
  children && dispatch(setPersonnelCount("childCount", Number(children)));
  infants && dispatch(setPersonnelCount("babyCount", Number(infants)));
  priceMin && priceMax && dispatch(setPrices([priceMin, priceMax]));
};

export default useUpdateStore;
