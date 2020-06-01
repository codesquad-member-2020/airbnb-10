import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

const Reservation = () => {
  const { isClicked } = useSelector((state) => state.reservationReducer);
  return <ReservationWrap isClicked={isClicked}>123</ReservationWrap>;
};

const ReservationWrap = styled.div`
  display: ${(props) => (props.isClicked ? "block" : "none")};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  min-height: 360px;
  width: 300px;
  z-index: 1;
  background-color: var(--white);
`;

export default Reservation;
