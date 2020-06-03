import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeReservation } from "../../modules/reservation.js";
import useFetch from "../../hooks/useFetch.jsx";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../hooks/useFetch.jsx";

const Reservation = () => {
  const dispatch = useDispatch();
  const { isClicked, content, scoresRating } = useSelector(
    (state) => state.reservationReducer,
  );

  const { pricePerNightDiscounted } = content;
  console.log(content, 1);

  const onClickCloseBtn = () => {
    dispatch(closeReservation());
  };

  return (
    <>
      <ReservationWrap isClicked={isClicked}>
        <CloseBtn onClick={onClickCloseBtn}>X</CloseBtn>
        <div>
          <PricePerNight>₩{pricePerNightDiscounted}</PricePerNight>
          <span>/박</span>
        </div>
        <div>
          <span>{scoresRating}</span>
          <FontAwesomeIcon icon={faStar} />
        </div>
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

const PricePerNight = styled.span`
  font-weight: bold;
  font-size: 20px;
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
