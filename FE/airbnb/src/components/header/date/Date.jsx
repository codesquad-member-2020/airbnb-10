import React, { useState } from "react";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment";
import "moment/locale/ko";

import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setResetDate,
} from "../../../modules/date.js";

import { DateWarp } from "../../../style/CustomStyle.jsx";

import styled from "styled-components";
import CalendarButtons from "./CalendarButtons.jsx";

const Date = () => {
  const { startDate, endDate } = useSelector((state) => state.dateReducer);
  const dispatch = useDispatch();

  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
  };

  return (
    <div>
      <DateWarp>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          startDateId="tata-start-date"
          endDateId="tata-end-date"
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => {
            setFocusedInput(focusedInput);
          }}
          readOnly
          showClearDates
          calendarInfoPosition="bottom"
          renderCalendarInfo={CalendarButtons}
          keepOpenOnDateSelect
          autoFocus
        />
      </DateWarp>
    </div>
  );
};

export default Date;

// const judge_test = () => {
//   if (startDate !== null) {
//     return setDate(startDate)(dispatch, startDates);
//   }
//   if (endDate !== null) {
//     return setDate(endDate)(dispatch, endDates);
//   }
// };

// const setDate = (dateObj) => {
//   const year = dateObj._d.getUTCFullYear();
//   const month = dateObj._d.getMonth() + 1;
//   const date = dateObj._d.getDate();
//   return (dispatchDate = (dispatch, actionFunc) => {
//     return dispatch(actionFunc(year, month, date));
//   });
// };
