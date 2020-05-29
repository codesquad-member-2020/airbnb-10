import React from "react";

import styled from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RoomsList = ({ roomsData }) => {
  console.log(roomsData);
  const { images, isSuperHost, city, scoresRating } = roomsData;

  return (
    <RoomsWrap>
      <ImageArea>
        <img src={images[0]} alt="숙소이미지" />
      </ImageArea>
      <RoomsContent>
        <RoomContentRow>
          <div>
            {isSuperHost && <SuperHost>슈퍼호스트</SuperHost>}
            <span>{city}</span>
          </div>
          <div>
            <StarIcon>
              <FontAwesomeIcon icon={faStar} />
            </StarIcon>
            <span>{scoresRating}</span>
          </div>
        </RoomContentRow>
      </RoomsContent>
    </RoomsWrap>
  );
};

const RoomsWrap = styled.div`
  padding: 20px 0;
`;

const RoomsContent = styled.div``;

const RoomContentRow = styled.div`
  ${DefaultLayout}
  justify-content:space-between;
  margin: 10px 0;
`;

const ImageArea = styled.div`
  width: 380px;
  height: 260px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const SuperHost = styled.span`
  margin-right: 5px;
  padding: 1px 5px;
  border-radius: 8px;
  font-size: 13px;
  color: #fff;
  background-color: var(--subColor);
`;

const StarIcon = styled.span`
  padding: 0 10px;
  color: var(--mainColor);
`;

export default RoomsList;
