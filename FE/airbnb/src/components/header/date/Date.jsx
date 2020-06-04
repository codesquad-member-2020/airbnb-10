import React, { useState } from "react";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setResetDate,
} from "../../../modules/date.js";

import { DateWarp } from "../../../style/CustomStyle.jsx";

import ModalButtons from "../ModalButtons.jsx";

const Date = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state.dateReducer);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));

    if (focusedInput === "endDate") {
      setFocusedInput("startDate");
    }
  };

  const onClickResetHandler = () => {
    dispatch(setResetDate());
  };

  const onClickDatePickerInputHandler = () => {
    setFocusedInput("startDate");
  };

  const CalendarButtonsTab = () => {
    return <ModalButtons resetHandler={onClickResetHandler} />;
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
          calendarInfoPosition="bottom"
          renderCalendarInfo={CalendarButtonsTab}
          keepOpenOnDateSelect
        />
        <DatePickerInputWrap onClick={onClickDatePickerInputHandler} />
      </DateWarp>
    </div>
  );
};

const DatePickerInputWrap = styled.div`
  position: absolute;
  width: 96%;
  height: 100%;
  top: 4%;
  border-radius: 10px;
  cursor: pointer;
`;

export default Date;
