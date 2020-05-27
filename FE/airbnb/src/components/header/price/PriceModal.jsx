import React from "react";
import PriceRange from "./PriceRange.jsx";

import styled from "styled-components";
import { ToggleWrap, DefaultLayout } from "../../../style/CustomStyle.jsx";

const PriceModal = ({ priceValues, minPrice, maxPrice }) => {
  return (
    <PriceModalWrap>
      <PriceRange priceValues={priceValues}></PriceRange>
      <PriceBoxWrap>
        <PriceBox>
          <span>최저요금</span>
          <div>
            <span>₩</span>
            <span>{minPrice}</span>
          </div>
        </PriceBox>
        <PriceBox>
          <span>최고요금</span>
          <div>
            <span>₩</span>
            <span>{maxPrice}</span>
          </div>
        </PriceBox>
      </PriceBoxWrap>
    </PriceModalWrap>
  );
};

const PriceModalWrap = styled(ToggleWrap)`
  padding: 20px;
  width: 30vw;
  height: 40vh;
`;

const PriceBoxWrap = styled(DefaultLayout)`
  justify-content: space-between;
  padding: 30px 0;
`;

const PriceBox = styled.div`
  width: 200px;
  height: 50px;
  border: 1px solid var(--gray-1);
  border-radius: 10px;
`;

export default PriceModal;
