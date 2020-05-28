import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { fetchInitialData } from "../../modules/roomsList.js";
import { useDispatch, useSelector } from "react-redux";

const Rooms = () => {
  const dispatch = useDispatch();
  useFetch(
    "http://15.165.117.230/api/mock/rooms?checkIn=2020-05-28&checkOut=2020-05-29",
    fetchInitialData,
    dispatch,
  );
  const { content } = useSelector((state) => state.roomsListReducer);

  return <div></div>;
};

export default Rooms;
