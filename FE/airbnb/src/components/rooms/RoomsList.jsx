import React from "react";

import styled, { css } from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RoomsList = ({ roomsData }) => {
  console.log(roomsData);
  const {
    images,
    isSuperHost,
    city,
    scoresRating,
    name,
    pricePerNight,
    pricePerNightDiscounted,
    totalPrice,
  } = roomsData;

  const getCurrency = (stringNum) => {
    return parseInt(stringNum).toLocaleString();
  };

  return (
    <RoomsWrap>
      <ImageArea>
        <img src={images[1]} alt="숙소이미지" />
      </ImageArea>
      <RoomsContent>
        <ContentRowBothEnds>
          <div>
            {isSuperHost && <SuperHost>슈퍼호스트</SuperHost>}
            <City>{city}</City>
          </div>
          {scoresRating && (
            <div>
              <StarIcon>
                <FontAwesomeIcon icon={faStar} />
              </StarIcon>
              <span>{scoresRating}</span>
            </div>
          )}
        </ContentRowBothEnds>
        <ContentRow>
          <Title>{name}</Title>
        </ContentRow>
        <ContentRow>
          {pricePerNight !== pricePerNightDiscounted && (
            <OriginalPrice discount>
              ₩{getCurrency(pricePerNight)}
            </OriginalPrice>
          )}
          <TotalPrice>₩{getCurrency(pricePerNightDiscounted)}</TotalPrice>
        </ContentRow>
        <ContentRowBothEnds>
          <div>
            <span>총요금 </span>
            <TotalPrice>{getCurrency(totalPrice)}</TotalPrice>
          </div>
          <ReservationBtn>예약</ReservationBtn>
        </ContentRowBothEnds>
      </RoomsContent>
    </RoomsWrap>
  );
};

const RoomsWrap = styled.div`
  padding: 20px 13px;
  width: 26%;
  min-width: 50px;
  /* border: 1px solid var(--gray-1); */
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
  margin: 14px 0;
`;

const ContentRowBothEnds = styled(ContentRow)`
  justify-content: space-between;
`;

const City = styled.span`
  color: #848080;
`;

const ImageArea = styled.div`
  height: 240px;
  & img {
    width: 100%;
    height: 100%;
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
const OriginalPrice = styled.span`
  color: ${(props) => (props.discount ? "#848080" : "#000")};
  text-decoration: line-through;
  margin-right: 10px;
`;

const TotalPrice = styled.span`
  color: var(--black);
  font-weight: bold;
`;

const ReservationBtn = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 10px;
  color: var(--white);
  font-weight: bold;
  background-color: var(--mainColor);
  cursor: pointer;
`;

export default RoomsList;
