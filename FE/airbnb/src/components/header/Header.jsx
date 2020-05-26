import React from "react";
import Personnel from "./personnel/Personnel.jsx";
import Date from "./date/Date.jsx";

import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrap>
      <Personnel />
      <Date />
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  display: flex;
`;

export default Header;
