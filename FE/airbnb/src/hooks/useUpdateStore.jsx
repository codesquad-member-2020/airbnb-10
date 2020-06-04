import { setStartDate, setEndDate } from "../modules/date.js";
import { setPersonnelCount } from "../modules/personnel.js";
import { setPrices } from "../modules/price.js";
import { updateCurrentPage } from "../modules/pagination.js";

import _ from "../util/util.js";
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
    OffsetItems,
  } = parsedQueryString;

  checkIn && dispatch(setStartDate(moment(checkIn)));
  checkOut && dispatch(setEndDate(moment(checkOut)));
  adults && dispatch(setPersonnelCount("adultCount", Number(adults)));
  children && dispatch(setPersonnelCount("childCount", Number(children)));
  infants && dispatch(setPersonnelCount("babyCount", Number(infants)));
  priceMin &&
    priceMax &&
    dispatch(setPrices([Number(priceMin), Number(priceMax)]));
  OffsetItems &&
    dispatch(updateCurrentPage(_.setCurrentPage(Number(OffsetItems))));
};

export default useUpdateStore;
