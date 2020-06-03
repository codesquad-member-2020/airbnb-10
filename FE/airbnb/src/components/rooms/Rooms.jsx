import React, { useEffect, useState, memo } from "react";
import useFetch, { fetchData } from "../../hooks/useFetch.jsx";
import { fetchInitialData } from "../../modules/roomsList.js";
import { useDispatch, useSelector } from "react-redux";
import RoomsList from "./RoomsList.jsx";

import styled from "styled-components";
import { DefaultLayout } from "../../style/CustomStyle.jsx";

import { getDate } from "../../util/util.js";

const getInitialUrl = () => {
  const today = getDate(0);
  const tomorrow = getDate(1);
  const initialUrl = `http://15.165.117.230/api/mock/rooms?checkIn=${today}&checkOut=${tomorrow}`;
  return initialUrl;
};

const Rooms = memo(() => {
  console.log(2);
  const [totalCount, setTotalCount] = useState(null);
  const dispatch = useDispatch();

  useFetch(getInitialUrl(), fetchInitialData);
  // useEffect(() => {
  //   dispatch(fetchInitialData(mock));
  // }, []);

  const {
    content: { total, accommodations },
  } = useSelector((state) => state.roomsListReducer);

  useEffect(() => {
    setTotalCount(total);
  }, [total]);

  return (
    <RoomsWrap>
      <Title>
        <div>{totalCount}개 이상의 숙소</div>
      </Title>
      <RoomsListWrap>
        {accommodations.map((roomsData) => (
          <RoomsList key={roomsData.id} roomsData={roomsData} />
        ))}
      </RoomsListWrap>
    </RoomsWrap>
  );
});

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
