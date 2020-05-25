import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment";
import "moment/locale/ko";

import React, { useState } from "react";

import { DateWarp } from "../../style/CustomStyle.jsx";

const Date = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <DateWarp>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        startDateId="tata-start-date"
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        readOnly
        showClearDates
      />
    </DateWarp>
  );
};

export default Date;
