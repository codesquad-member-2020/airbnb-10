import React from "react";

import styled from "styled-components";
import { ToggleWrap } from "../../../style/CustomStyle.jsx";

const PriceModal = () => {
  return <PriceModalWrap></PriceModalWrap>;
};

const PriceModalWrap = styled(ToggleWrap)`
  width: 30vw;
  height: 40vh;
`;

export default PriceModal;
