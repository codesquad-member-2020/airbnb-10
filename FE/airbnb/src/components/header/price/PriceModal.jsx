import React from "react";
import PriceRange from "./PriceRange.jsx";
import PriceBoxes from "./PriceBoxes.jsx";
import ModalButtons from "../ModalButtons.jsx";

import styled from "styled-components";
import { ToggleWrap } from "../../../style/CustomStyle.jsx";

const PriceModal = ({ priceValues, minPrice, maxPrice }) => {
  return (
    <PriceModalWrap>
      <PriceRange priceValues={priceValues}></PriceRange>
      <PriceBoxes minPrice={minPrice} maxPrice={maxPrice} />
      {/* <ButtonsArea>
        <ResetButton>지우기</ResetButton>
        <SaveButton>저장</SaveButton>
      </ButtonsArea> */}
      <ModalButtons />
    </PriceModalWrap>
  );
};

const PriceModalWrap = styled(ToggleWrap)`
  padding: 20px;
  width: 30vw;
  height: 40vh;
`;

export default PriceModal;
