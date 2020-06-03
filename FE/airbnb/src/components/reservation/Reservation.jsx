import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { closeReservation } from "../../modules/reservation.js";
import useFetch from "../../hooks/useFetch.jsx";
import { getCurrency } from "../../util/util.js";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../hooks/useFetch.jsx";
import { DefaultLayout } from "../../style/CustomStyle.jsx";
import { ReservationBtn } from "../../style/CustomStyle.jsx";

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
  const { totalCount } = useSelector((state) => state.personnelReducer);
  console.log(totalCount, "total");

  const [selectedPersonnel, setSelectedPersonnel] = useState(1);

  // const a = startDate.format("YYYY-MM-DD");
  // console.log(a);

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

  const selectOptionRender = (selectedPersonnel) => {
    const MAX_PERSONNEL = 8;

    const optionHtml = Array(MAX_PERSONNEL)
      .fill()
      .map((_, index) => {
        const personnel = index + 1;
        if (personnel === selectedPersonnel) {
          return (
            <option key={personnel} selected value={`게스트 ${personnel}명`}>
              게스트 {personnel}명
            </option>
          );
        }
        return (
          <option key={personnel} value={`게스트 ${personnel}명`}>
            게스트 {personnel}명
          </option>
        );
      });

    return optionHtml;
  };

  useEffect(() => {
    if (totalCount) setSelectedPersonnel(totalCount);
  }, [totalCount]);

  return (
    <>
      <ReservationWrap isClicked={isClicked}>
        <CloseBtn onClick={onClickCloseBtn}>X</CloseBtn>
        <Row>
          <PricePerNight>₩{getCurrency(pricePerNightDiscounted)}</PricePerNight>
          <span>/박</span>
        </Row>
        {scoresRating && scoreRender()}
        <DateRowBox>
          <Title>날짜</Title>
          <div>{/* <span>{startDate}</span>→<span>{endDate}</span> */}</div>
        </DateRowBox>
        <RowBox>
          <Title>인원</Title>
          <select>{selectOptionRender(selectedPersonnel)}</select>
        </RowBox>
        <PriceRow>
          <span>
            ₩{getCurrency(pricePerNightDiscounted)} x {}박
          </span>
          <span></span>
        </PriceRow>
        <PriceRow>
          <span>청소비</span>
          <span>₩{getCurrency(cleaningFee)}</span>
        </PriceRow>
        <PriceRow>
          <span>서비스 수수료</span>
          <span>₩{getCurrency(serviceTax)}</span>
        </PriceRow>
        <PriceRow>
          <span>숙박세와 수수료</span>
          <span>₩{getCurrency(accommodationTax)}</span>
        </PriceRow>
        <TotalRow>
          <span>합계</span>
          <span>₩{getCurrency(totalPrice)}</span>
        </TotalRow>
        <LongReservationBtn>예약하기</LongReservationBtn>
        <Message>예약 확정 전에는 요금이 청구되지 않습니다</Message>
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
  padding: 20px 45px;
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
  margin: 15px 0;
`;

const PriceRow = styled(Row)`
  ${DefaultLayout}
  justify-content:space-between;
  padding: 0px 0 15px;
  border-bottom: 1px solid var(--gray-1);
  font-size: 15px;
`;

const ScoreRow = styled(Row)`
  font-size: 13px;
  padding-bottom: 10px;
`;
const TotalRow = styled(PriceRow)`
  font-weight: bold;
  border-bottom: none;
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

const LongReservationBtn = styled(ReservationBtn)`
  width: 100%;
  height: 40px;
`;

const Message = styled(Row)`
  padding: 10px 0 13px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #555;
`;

const ModalShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.08);
`;

export default Reservation;
