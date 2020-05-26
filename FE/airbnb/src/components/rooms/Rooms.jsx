import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { fetchInitialData } from "../../modules/roomsList.js";
import { useDispatch } from "react-redux";

const Rooms = () => {
  //const dispatch = useDispatch();
  useFetch("http://15.165.117.230/api/mock/rooms");
  // fetchInitialData, dispatch
  return <div></div>;
};

export default Rooms;
