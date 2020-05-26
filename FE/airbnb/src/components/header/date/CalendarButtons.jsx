import React from "react";

import { SaveButton, ResetButton } from "../../../style/CustomStyle.jsx";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { setResetDate } from "../../../modules/date.js";

const CalendarButtons = () => {
  const dispatch = useDispatch();

  //   const onClickResetBtn = () => {
  //     dispatch(setResetDate());
  //   };

  const onClickSaveBtn = () => {};

  return (
    <CalerndarButtonsWrap>
      <ResetButton>지우기</ResetButton>
      <SaveButton>저장</SaveButton>
    </CalerndarButtonsWrap>
  );
};

const CalerndarButtonsWrap = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default CalendarButtons;
