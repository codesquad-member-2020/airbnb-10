import React from "react";

import styled from "styled-components";

const RoomsList = ({ roomsData }) => {
  console.log(roomsData);
  const { images, isSuperHost } = roomsData;

  return (
    <RoomsListWrap>
      <ImageArea>
        <img src={images[0]} alt="숙소이미지" />
      </ImageArea>
      <RoomsListContent>
        <div></div>
      </RoomsListContent>
    </RoomsListWrap>
  );
};

const RoomsListWrap = styled.div`
  padding: 20px 0;
`;

const ImageArea = styled.div`
  width: 380px;
  height: 260px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const RoomsListContent = styled.div``;

export default RoomsList;
