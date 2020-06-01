import React, { useState, useEffect, useRef } from "react";
import PriceModal from "./PriceModal.jsx";

import styled from "styled-components";
import { Button } from "../../../style/CustomStyle.jsx";

const Price = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleContainer = useRef();

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const onClickOutsideHandler = () => {
    if (isOpen && !toggleContainer.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutsideHandler);
  });

  return (
    <PriceWrap ref={toggleContainer}>
      <Button onClick={onClickHandler}>금액</Button>
      {isOpen && <PriceModal />}
    </PriceWrap>
  );
};

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

const PriceWrap = styled.div`
  position: relative;
`;

export default Price;
