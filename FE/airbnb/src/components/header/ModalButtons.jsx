import React from "react";
import {
  ButtonsArea,
  SaveButton,
  ResetButton,
} from "../../style/CustomStyle.jsx";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import _ from "../../util/util.js";
import moment from "moment";

import { setStartDate, setEndDate } from "../../modules/date.js";

const DEFAULT_PERSONNEL_COUNT = 1;

const ModalButtons = ({ resetHandler, width, height }) => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const { personnelReducer, dateReducer, priceReducer } = store;

  const { startDate, endDate } = dateReducer; // Date
  const { adultCount, childCount, babyCount, totalCount } = personnelReducer; // Personnel
  const { priceValues } = priceReducer; // Price
  const [minPrice, maxPrice] = priceValues;

  const setCheckDateQueryString = () => {
    if (!startDate && !endDate) {
      const checkInMoment = moment();
      const checkOutMoment = moment().add("days", 1);

      const checkInDate = checkInMoment.format("YYYY-MM-DD");
      const checkOutDate = checkOutMoment.format("YYYY-MM-DD");

      dispatch(setStartDate(checkInMoment));
      dispatch(setEndDate(checkOutMoment));

      return `checkIn=${checkInDate}&checkOut=${checkOutDate}&`;
    } else if (startDate && !endDate) {
      const checkOutMoment = moment(checkInDateFormat);
      const checkOutDate = checkOutDate.format("YYYY-MM-DD");

      dispatch(setEndDate(checkOutMoment.add("days", 1)));

      return `checkIn=${checkInDate}&checkOut=${checkOutDate}&`;
    } else if (startDate && endDate) {
      const checkInDate = startDate.format("YYYY-MM-DD");
      const checkOutDate = endDate.format("YYYY-MM-DD");

      return `checkIn=${checkInDate}&checkOut=${checkOutDate}&`;
    }
  };

  const setPersonnelQueryString = () => {
    if (totalCount === 0) {
      return `adults=${DEFAULT_PERSONNEL_COUNT}&`;
    } else {
      const adults = adultCount ? `adults=${adultCount}&` : "";
      const children = childCount ? `children=${childCount}&` : "";
      const infants = babyCount ? `infants=${babyCount}&` : "";

      return adults + children + infants;
    }
  };

  const setRequestURL = () => {
    const ROOMS_DB_HOST = process.env.REACT_APP_ROOMS_DB_HOST;

    const checkDateQueryString = setCheckDateQueryString();
    const personnelQueryString = setPersonnelQueryString();
    const minPriceQueryString = `priceMin=${minPrice}&`;
    const maxPriceQueryString = `priceMax=${maxPrice}`;

    const requestURL =
      ROOMS_DB_HOST +
      checkDateQueryString +
      personnelQueryString +
      minPriceQueryString +
      maxPriceQueryString;

    return requestURL;
  };

  const saveHandler = () => {
    fetch(setRequestURL())
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <CustomButtonsArea width={width} height={height}>
      <ResetButton onClick={resetHandler}>지우기</ResetButton>
      <SaveButton onClick={saveHandler}>저장</SaveButton>
    </CustomButtonsArea>
  );
};

const CustomButtonsArea = styled(ButtonsArea)`
  width: ${(props) => (props.width ? `${props.width}%` : `100%`)};
  height: ${(props) => props.height && `${props.height}%`};
`;

export default ModalButtons;
