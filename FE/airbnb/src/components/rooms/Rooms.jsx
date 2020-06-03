import React, { useEffect, useState, memo } from "react";
import useFetch, {
  fetchData,
  TEST_ROOMS_FETCH,
  useRoomsFetch,
} from "../../hooks/useFetch.jsx";
import { fetchInitialData } from "../../modules/roomsList.js";
import { useDispatch, useSelector } from "react-redux";
import RoomsList from "./RoomsList.jsx";

import styled from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";

const Rooms = ({ location }) => {
  const ROOMS_DB_HOST = process.env.REACT_APP_ROOMS_DB_HOST;

  const [totalCount, setTotalCount] = useState(null);
  const dispatch = useDispatch();

  const {
    content: { total, accommodations },
  } = useSelector((state) => state.roomsListReducer);

  useEffect(() => {
    setTotalCount(total);
  }, [total]);

  useRoomsFetch(fetchInitialData, location.search);

  return (
    <RoomsWrap>
      <Title>
        <div>{totalCount}개 이상의 숙소</div>
      </Title>
      <RoomsListWrap>
        {accommodations.map((roomsData, i) => (
          <RoomsList key={roomsData.id} roomsData={roomsData} />
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
