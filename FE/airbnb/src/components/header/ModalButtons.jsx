import React from "react";
import {
  ButtonsArea,
  SaveButton,
  ResetButton,
} from "../../style/CustomStyle.jsx";

const ModalButtons = ({ resetHandler, saveHandler }) => {
  return (
    <ButtonsArea>
      <ResetButton onClick={resetHandler}>지우기</ResetButton>
      <SaveButton onClick={saveHandler}>저장</SaveButton>
    </ButtonsArea>
  );
};

export default ModalButtons;
