import React from "react";

import { getCurrency } from "../../util/util.js";

import styled from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";

const ReservationPrice = ({ title, price, className }) => {
  const PriceRow = styled.div`
    ${DefaultLayout}
    justify-content:space-between;
    padding: 0px 0 15px;
    border-bottom: 1px solid var(--gray-1);
    font-size: 15px;
    margin: 15px 0;

    .${className} {
      font-weight: bold;
      border-bottom: none;
    }
  `;

  return (
    <>
      {price && (
        <PriceRow>
          <span className={className}>{title}</span>
          <span>₩{getCurrency(price)}</span>
        </PriceRow>
      )}
    </>
  );
};

export default ReservationPrice;
