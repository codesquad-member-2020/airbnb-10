import React from "react";
import PriceRange from "./PriceRange.jsx";

import styled from "styled-components";
import { ToggleWrap } from "../../../style/CustomStyle.jsx";

const PriceModal = ({ priceValues }) => {
  return (
    <PriceModalWrap>
      <PriceRange priceValues={priceValues}></PriceRange>
    </PriceModalWrap>
  );
};

const PriceModalWrap = styled(ToggleWrap)`
  padding: 20px;
  width: 30vw;
  height: 40vh;
`;

export default PriceModal;
