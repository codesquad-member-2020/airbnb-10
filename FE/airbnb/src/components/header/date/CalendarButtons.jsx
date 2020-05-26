import React from "react";
import { SaveButton, ResetButton } from "../../../style/CustomStyle.jsx";
import styled from "styled-components";

const CalendarButtons = ({ resetHandler, saveHandler }) => {
  return (
    <CalerndarButtonsWrap>
      <ResetButton onClick={resetHandler}>지우기</ResetButton>
      <SaveButton onClick={saveHandler}>저장</SaveButton>
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
