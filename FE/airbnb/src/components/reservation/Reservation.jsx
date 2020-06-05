import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";

import { getCurrency, getUrl } from "../../util/util.js";
import ReservationPrice from "./ReservationPrice.jsx";
import useFetch from "../../hooks/useFetch.jsx";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { DefaultLayout } from "../../style/CustomStyle.jsx";
import { ReservationBtn } from "../../style/CustomStyle.jsx";

import moment from "moment";

const Reservation = memo(({ setOpenReservation }) => {
  const {
    content: {
      pricePerNightDiscounted,
      priceDuringPeriod,
      cleaningFee,
      serviceTax,
      accommodationTax,
      totalPrice,
    },
    scoresRating,
  } = useSelector((state) => state.reservationReducer);

  const { startDate, endDate } = useSelector((state) => state.dateReducer);
  const { totalCount } = useSelector((state) => state.personnelReducer);

  const [selectedPersonnel, setSelectedPersonnel] = useState(1);

  let formatedStartDate;
  let formatedEndDatee;
  let period = 1;

  const url = process.env.REACT_APP_RESERVATION_DB_HOST;

  if (!startDate) {
    const today = moment();
    const tomorrow = moment().add("days", 1);

    formatedStartDate = today.format("YYYY.MM.DD");
    formatedEndDatee = tomorrow.format("YYYY.MM.DD");
  } else {
    formatedStartDate = startDate.format("YYYY.MM.DD");
    formatedEndDatee = endDate.format("YYYY.MM.DD");
    period = endDate.diff(startDate, "days");
  }

  const onClickCloseBtn = () => {
    setOpenReservation(false);
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
    const MAX_PERSONNEL = 8;

    const optionHtml = Array(MAX_PERSONNEL)
      .fill()
      .map((_, index) => {
        const personnel = index + 1;

        return (
          <option key={personnel} value={personnel}>
            게스트 {personnel}명
          </option>
        );
      });

    return optionHtml;
  };

  useEffect(() => {
    setSelectedPersonnel(totalCount);
  }, [totalCount]);

  const onChangeSelect = () => {
    setSelectedPersonnel(totalCount);
    //fetch요청
  };

  const onClickReservation = ({ target }) => {
    console.log(target);
    if (confirm("예약하시겠습니까?")) {
      // getUrl()
      alert("예약되셨습니다.");
      setOpenReservation(false);
    } else return;
  };

  const priceRender = (title, price) => {
    return (
      <PriceRow>
        <span>{title}</span>
        <span>₩{getCurrency(price)}</span>
      </PriceRow>
    );
  };

  const getPriceDuringPeriodTitle = () => {
    const pricePerNight = getCurrency(pricePerNightDiscounted);
    return `₩${pricePerNight} x ${period}박`;
  };

  return (
    <>
      <ReservationWrap>
        <CloseBtn onClick={onClickCloseBtn}>X</CloseBtn>
        <Row>
          <PricePerNight>₩{getCurrency(pricePerNightDiscounted)}</PricePerNight>
          <span>/박</span>
        </Row>
        {scoresRating && scoreRender()}
        <DateRowBox>
          <Title>날짜</Title>
          <div>
            <span>{formatedStartDate}</span>→<span>{formatedEndDatee}</span>
          </div>
        </DateRowBox>
        <RowBox>
          <Title>인원</Title>
          <select onChange={onChangeSelect} value={selectedPersonnel}>
            {selectOptionRender()}
          </select>
        </RowBox>
        <ReservationPrice
          title={getPriceDuringPeriodTitle()}
          price={priceDuringPeriod}
        />
        <ReservationPrice title={"청소비"} price={cleaningFee} />
        <ReservationPrice title={"서비스 수수료"} price={serviceTax} />
        <ReservationPrice title={"숙박세와 수수료"} price={accommodationTax} />
        <ReservationPrice
          title={"합계"}
          price={totalPrice}
          className={"total-price"}
        />
        <LongReservationBtn onClick={onClickReservation}>
          예약하기
        </LongReservationBtn>
        <Message>예약 확정 전에는 요금이 청구되지 않습니다</Message>
      </ReservationWrap>
      <ModalShadow />
    </>
  );
});

const ReservationWrap = styled.div`
  position: fixed;
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

const ScoreRow = styled(Row)`
  font-size: 13px;
  padding-bottom: 5px;
`;

const RowBox = styled(Row)`
  font-size: 13px;
  & select,
  div {
    text-align: center;
    margin-top: 10px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    border: 1px solid var(--gray-1);
  }
  & select {
    padding-left: 10px;
  }
`;

const DateRowBox = styled(RowBox)`
  padding-top: 20px;
  border-top: 1px solid var(--gray-1);
  & div {
    display: flex;
    justify-content: space-around;
    font-size: 18px;
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

const ScoreIcon = styled.span`
  color: var(--mainColor);
  margin-right: 5px;
`;

const PricePerNight = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const LongReservationBtn = styled(ReservationBtn)`
  width: 100%;
  height: 45px;
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
  background-color: rgba(0, 0, 0, 0.8);
`;

export default Reservation;
