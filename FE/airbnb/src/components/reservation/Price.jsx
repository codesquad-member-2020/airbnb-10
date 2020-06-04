import React from "react";

import { getCurrency } from "../../util/util.js";

import styled from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";

const Price = ({ Row, title, price }) => {
  let total = null;
  if (title === "합계") total = "total";
  return (
    <>
      {price && (
        <PriceRow className={total}>
          <span>{title}</span>
          <span>₩{getCurrency(price)}</span>
        </PriceRow>
      )}
    </>
  );
};

const PriceRow = styled(Row)`
  ${DefaultLayout}
  justify-content:space-between;
  padding: 0px 0 15px;
  border-bottom: 1px solid var(--gray-1);
  font-size: 15px;
  font-weight: bold;
  border-bottom: none;
  .total {
    font-weight: bold;
    border-bottom: none;
  }
`;

export default Price;
