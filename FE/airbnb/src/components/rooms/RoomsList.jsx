import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchReservation } from "../../modules/reservation.js";
import Reservation from "../reservation/Reservation.jsx";
import { getCurrency, getDate, getUrl } from "../../util/util.js";

import styled from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../hooks/useFetch.jsx";
import { ReservationBtn } from "../../style/CustomStyle.jsx";

import Slider from "react-slick";

const RoomsList = memo(({ roomsData, location }) => {
  const {
    id,
    images,
    isSuperHost,
    city,
    scoresRating,
    name,
    pricePerNight,
    pricePerNightDiscounted,
    totalPrice,
  } = roomsData;

  const [openReservation, setOpenReservation] = useState(false);

  const dispatch = useDispatch();

  const url = process.env.REACT_APP_RESERVATION_DB_HOST;

  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const scoreRender = () => {
    return (
      <div>
        <StarIcon>
          <FontAwesomeIcon icon={faStar} />
        </StarIcon>
        <ScoresRating>{scoresRating}</ScoresRating>
      </div>
    );
  };

  const originalPriceRender = () => {
    return (
      <OriginalPrice discount>₩{getCurrency(pricePerNight)}</OriginalPrice>
    );
  };

  const fetchReservationData = (reservationUrl) => {
    fetchData(reservationUrl).then((data) =>
      dispatch(fetchReservation(data, scoresRating)),
    );
  };

  const onClickReservation = ({ target: { id } }) => {
    const search = location.search;
    let reservationUrl = url + id;

    reservationUrl = getUrl(search, reservationUrl);
    setOpenReservation(true);
    fetchReservationData(reservationUrl);
  };

  return (
    <>
      <RoomsWrap>
        <ImageArea>
          {/* <img src={images[0]} /> */}
          <Slider {...setting}>
            {images.map((el) => {
              return <img src={el} />;
            })}
          </Slider>
        </ImageArea>
        <RoomsContent>
          <ContentRowBothEnds>
            <div>
              {isSuperHost && <SuperHost>슈퍼호스트</SuperHost>}
              <span>{city}</span>
            </div>
            {scoresRating && scoreRender()}
          </ContentRowBothEnds>
          <ContentRow>
            <Title>{name}</Title>
          </ContentRow>
          <ContentRow>
            {pricePerNight !== pricePerNightDiscounted && originalPriceRender()}
            <TotalPrice>₩{getCurrency(pricePerNightDiscounted)}</TotalPrice>
          </ContentRow>
          <ContentRowBothEnds>
            <div>
              <span>총요금 </span>
              <TotalPrice total>₩{getCurrency(totalPrice)}</TotalPrice>
            </div>
            <ReservationBtn id={id} onClick={onClickReservation}>
              예약
            </ReservationBtn>
          </ContentRowBothEnds>
        </RoomsContent>
      </RoomsWrap>
      {openReservation && (
        <Reservation
          setOpenReservation={setOpenReservation}
          id={id}
          location={location}
        />
      )}
    </>
  );
});

const RoomsWrap = styled.div`
  margin: 0 10px 20px;
  padding: 20px 13px 0;
  width: 21%;
  min-width: 300px;

  box-shadow: var(--box-shadow);
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const RoomsContent = styled.div`
  font-size: 15px;
`;

const ContentRow = styled.span`
  ${DefaultLayout}
  margin: 12px 0;
`;

const ContentRowBothEnds = styled(ContentRow)`
  justify-content: space-between;
  color: var(--gray-2);
`;

const ImageArea = styled.div`
  height: 220px;
  & img {
    width: 100%;
    height: 200px;
    border-radius: 5px;
  }
`;

const Title = styled.span`
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SuperHost = styled.span`
  margin-right: 5px;
  padding: 1px 5px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--white);
  background-color: var(--subColor);
`;

const StarIcon = styled.span`
  padding: 0 10px;
  color: var(--mainColor);
`;

const ScoresRating = styled.span`
  color: var(--black);
`;

const OriginalPrice = styled.span`
  color: ${(props) => (props.discount ? `var(--gray-2)` : `var(--black)`)};
  text-decoration: line-through;
  margin-right: 10px;
`;

const TotalPrice = styled.strong`
  color: ${(props) => (props.total ? `var(--gray-2)` : `var(--black)`)};
  font-weight: bold;
  font-size: 16px;
`;

export default RoomsList;
