import React from "react";
import {
  ButtonsArea,
  SaveButton,
  ResetButton,
} from "../../style/CustomStyle.jsx";
import styled from "styled-components";

const ModalButtons = ({ resetHandler, saveHandler, width, height }) => {
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
