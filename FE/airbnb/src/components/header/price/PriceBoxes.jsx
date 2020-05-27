import React from "react";

import { DefaultLayout } from "../../../style/CustomStyle.jsx";
import styled from "styled-components";
const PriceBoxes = ({ minPrice, maxPrice }) => {
  return (
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
  );
};

const PriceBoxWrap = styled.div`
  ${DefaultLayout};
  justify-content: space-between;
  padding: 30px 0;
`;

const PriceBox = styled.div`
  width: 200px;
  height: 50px;
  border: 1px solid var(--gray-1);
  border-radius: 10px;
`;

export default PriceBoxes;
