import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

const Reservation = () => {
  const { isClicked } = useSelector((state) => state.reservationReducer);
  return <ReservationWrap isClicked={isClicked}>123</ReservationWrap>;
};

const ReservationWrap = styled.div`
  display: ${(props) => (props.isClicked ? "block" : "none")};
  z-index: 1;
  position: absolute;
  width: 300px;
  height: 500px;
  background-color: red;
`;

export default Reservation;
