import React, { memo } from "react";
import { useRoomsFetch } from "../../hooks/useFetch.jsx";
import { useSelector } from "react-redux";
import RoomsList from "./RoomsList.jsx";

import styled from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";

const Rooms = ({ location }) => {
  const {
    content: { total, accommodations },
  } = useSelector((state) => state.roomsListReducer);

  useRoomsFetch(location.search);

  return (
    <RoomsWrap>
      <Title>
        <div>{total}개 이상의 숙소</div>
      </Title>
      <RoomsListWrap>
        {accommodations.map((roomsData) => (
          <RoomsList
            key={roomsData.id}
            roomsData={roomsData}
            location={location}
          />
        ))}
      </RoomsListWrap>
    </RoomsWrap>
  );
};

const RoomsWrap = styled.div`
  margin: 40px 30px;
`;

const Title = styled.div`
  padding: 20px 0;
  font-size: 19px;
`;

const RoomsListWrap = styled.div`
  ${DefaultLayout};
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export default Rooms;
