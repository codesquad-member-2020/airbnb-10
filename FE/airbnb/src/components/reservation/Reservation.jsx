import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeReservation } from "../../modules/reservation.js";
import useFetch from "../../hooks/useFetch.jsx";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../hooks/useFetch.jsx";
import { DefaultLayout } from "../../style/CustomStyle.jsx";

const Reservation = () => {
  const dispatch = useDispatch();
  const {
    isClicked,
    content: {
      pricePerNightDiscounted,
      cleaningFee,
      serviceTax,
      accommodationTax,
      totalPrice,
    },
    scoresRating,
  } = useSelector((state) => state.reservationReducer);

  const { startDate, endDate } = useSelector((state) => state.dateReducer);

  console.log(startDate);

  const onClickCloseBtn = () => {
    dispatch(closeReservation());
  };

  const scoreRender = () => {
    return (
      <ScoreRow>
        <ScoreIcon>
          <FontAwesomeIcon icon={faStar} />
        </ScoreIcon>
        <span>{scoresRating}</span>
      </ScoreRow>
    );
  };

  const selectOptionRender = () => {
    const optionHtml = Array(8)
      .fill()
      .map((_, index) => {
        const personnel = index + 1;
        return (
          <option value={`게스트 ${personnel}명`}>게스트 {personnel}명</option>
        );
      });

    return optionHtml;
  };

  return (
    <>
      <ReservationWrap isClicked={isClicked}>
        <CloseBtn onClick={onClickCloseBtn}>X</CloseBtn>
        <Row>
          <PricePerNight>₩{pricePerNightDiscounted}</PricePerNight>
          <span>/박</span>
        </Row>
        {scoresRating && scoreRender()}
        <DateRowBox>
          <Title>날짜</Title>
          <div>
            <span>{startDate}</span>→<span>{endDate}</span>
          </div>
        </DateRowBox>
        <RowBox>
          <Title>인원</Title>
          <select>{selectOptionRender()}</select>
        </RowBox>
        <PriceRow>
          <span>
            ₩{pricePerNightDiscounted} x {}박
          </span>
          <span></span>
        </PriceRow>
        <PriceRow>
          <span>청소비</span>
          <span>₩{cleaningFee}</span>
        </PriceRow>
        <PriceRow>
          <span>서비스 수수료</span>
          <span>₩{serviceTax}</span>
        </PriceRow>
        <PriceRow>
          <span>숙박세와 수수료</span>
          <span>₩{accommodationTax}</span>
        </PriceRow>
        <TotalRow>
          <span>합계</span>
          <span>₩{totalPrice}</span>
        </TotalRow>
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

const Row = styled.div`
  margin: 10px 0;
`;

const PriceRow = styled(Row)`
  ${DefaultLayout}
  justify-content:space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray-1);
  font-size: 15px;
`;

const ScoreRow = styled(Row)`
  font-size: 13px;
  padding-bottom: 10px;
`;
const TotalRow = styled(PriceRow)`
  font-weight: bold;
`;

const RowBox = styled(Row)`
  font-size: 13px;
  & select,
  div {
    text-align: center;
    margin-top: 10px;
    width: 100%;
    height: 37px;
    line-height: 37px;
    border: 1px solid var(--gray-1);
  }
  & select {
    padding-left: 10px;
  }
`;

const DateRowBox = styled(RowBox)`
  padding-top: 20px;
  border-top: 1px solid var(--gray-1);
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

const ScoreIcon = styled.span`
  color: var(--mainColor);
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
