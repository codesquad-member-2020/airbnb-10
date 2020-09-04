import React from "react";
import Personnel from "./personnel/Personnel.jsx";
import Date from "./date/Date.jsx";
import Price from "./price/Price.jsx";

import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrap>
      <Personnel />
      <Date />
      <Price />
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  display: flex;
`;

export default Header;
