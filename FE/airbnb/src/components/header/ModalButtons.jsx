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

const ModalButtons = ({ resetHandler, width, height }) => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const { personnelReducer, dateReducer, priceReducer } = store;

  const { startDate, endDate } = dateReducer; // Date
  const { adultCount, childCount, babyCount } = personnelReducer; // Personnel
  const { priceValues } = priceReducer; // Price
  const [minPrice, maxPrice] = priceValues;

  const setCheckDateQueryParameter = () => {
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
      const checkOutDate = startDate.format("YYYY-MM-DD");

      return `checkIn=${checkInDate}&checkOut=${checkOutDate}&`;
    }
  };

  const setResponseURL = () => {
    const ROOMS_DB_HOST = process.env.REACT_APP_ROOMS_DB_HOST;

    const adults = adultCount ? `adults=${adultCount}&` : "";
    const children = childCount ? `children=${childCount}&` : "";
    const infants = babyCount ? `infants=${babyCount}&` : "";

    return ROOMS_DB_HOST + adults + children + infants;
  };

  const saveHandler = () => {};

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
