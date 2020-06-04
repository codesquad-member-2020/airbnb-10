import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import {
  ButtonsArea,
  SaveButton,
  ResetButton,
} from "../../style/CustomStyle.jsx";
import styled from "styled-components";
import moment from "moment";

import _ from "../../util/util.js";

import { setStartDate, setEndDate } from "../../modules/date.js";
import { initPagination } from "../../modules/pagination.js";
import { setPersonnelCount } from "../../modules/personnel.js";

const DEFAULT_PERSONNEL_COUNT = 1;

const ModalButtons = ({ resetHandler, width, height }) => {
  const { personnelReducer, dateReducer, priceReducer } = useSelector(
    (store) => store,
  );
  const dispatch = useDispatch();

  const { startDate, endDate } = dateReducer; // Date
  const { adultCount, childCount, babyCount, totalCount } = personnelReducer; // Personnel
  const { priceValues } = priceReducer; // Price
  const [minPrice, maxPrice] = priceValues;

  const history = useHistory();

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
      const checkInDate = startDate.format("YYYY-MM-DD");
      const CheckInMoment = moment(checkInDate);

      const checkOutMoment = CheckInMoment.add("days", 1);
      const checkOutDate = checkOutMoment.format("YYYY-MM-DD");

      dispatch(setEndDate(checkOutMoment));

      return `checkIn=${checkInDate}&checkOut=${checkOutDate}&`;
    } else if (startDate && endDate) {
      const checkInDate = startDate.format("YYYY-MM-DD");
      const checkOutDate = endDate.format("YYYY-MM-DD");

      return `checkIn=${checkInDate}&checkOut=${checkOutDate}&`;
    }
  };

  const setPersonnelQueryString = () => {
    if (totalCount === 0) {
      dispatch(setPersonnelCount("adultCount", 1));
      return `adults=${DEFAULT_PERSONNEL_COUNT}&`;
    } else {
      const adults = adultCount ? `adults=${adultCount}&` : "";
      const children = childCount ? `children=${childCount}&` : "";
      const infants = babyCount ? `infants=${babyCount}&` : "";

      return adults + children + infants;
    }
  };

  const createQueryString = () => {
    const checkDateQueryString = setCheckDateQueryString();
    const personnelQueryString = setPersonnelQueryString();
    const minPriceQueryString = `priceMin=${minPrice}&`;
    const maxPriceQueryString = `priceMax=${maxPrice}`;

    const queryString =
      checkDateQueryString +
      personnelQueryString +
      minPriceQueryString +
      maxPriceQueryString;

    return queryString;
  };

  const saveHandler = () => {
    history.push(`/rooms?${createQueryString()}`);
    dispatch(initPagination());
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
