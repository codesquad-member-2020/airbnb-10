import React from "react";

import { getCurrency } from "../../util/util.js";

import styled from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";

const ReservationPrice = ({ title, price, className }) => {
  console.log("렌더링");

  return (
    <>
      {price && (
        <PriceRow className={className}>
          <span className={className}>{title}</span>
          <span>₩{getCurrency(price)}</span>
        </PriceRow>
      )}
    </>
  );
};

const PriceRow = styled.div`
  ${DefaultLayout}
  justify-content:space-between;
  padding: 0px 0 15px;
  border-bottom: 1px solid var(--gray-1);
  font-size: 15px;
  margin: 15px 0;
  .${(props) => props.className} {
    font-weight: bold;
    border-bottom: none;
  }
`;

export default ReservationPrice;
