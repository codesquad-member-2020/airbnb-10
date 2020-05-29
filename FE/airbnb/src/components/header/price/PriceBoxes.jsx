import React from "react";

import { DefaultLayout } from "../../../style/CustomStyle.jsx";
import styled from "styled-components";
const PriceBoxes = ({ minPrice, maxPrice }) => {
  return (
    <PriceBoxWrap>
      <PriceBox>
        <div className="title_box">
          <span className="title">최저요금</span>
        </div>
        <div className="price_box">
          <span className="price_unit">₩</span>
          <span className="price">{minPrice}</span>
        </div>
      </PriceBox>
      <PriceBox>
        <div className="title_box">
          <span className="title">최고요금</span>
        </div>
        <div className="price_box">
          <span className="price_unit">₩</span>
          <span className="price">{maxPrice}</span>
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
  width: 14vw;
  height: 50px;
  border: 1px solid var(--gray-1);
  border-radius: 10px;
  .title_box {
    margin-bottom: 3px;
    margin-left: 3px;
    .title {
      font-size: 14px;
      font-weight: bold;
      line-height: 10px;
      color: #646464;
    }
  }
  .price_box {
    .price_unit {
      margin-right: 3px;
      margin-left: 3px;
    }
  }
`;

export default PriceBoxes;
