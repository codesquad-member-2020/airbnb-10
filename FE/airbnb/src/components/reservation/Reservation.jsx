import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeReservation } from "../../modules/reservation.js";
import useFetch from "../../hooks/useFetch.jsx";

import styled from "styled-components";

const Reservation = () => {
  const dispatch = useDispatch();
  const { isClicked, content } = useSelector(
    (state) => state.reservationReducer,
  );

  const onClickCloseBtn = () => {
    dispatch(closeReservation());
  };

  return (
    <>
      <ReservationWrap isClicked={isClicked}>
        <CloseBtn onClick={onClickCloseBtn}>X</CloseBtn>
      </ReservationWrap>
      {isClicked && <ModalShadow />}
    </>
  );
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

const CloseBtn = styled.button`
  position: absolute;
  right: 20px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
`;

const ModalShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export default Reservation;
