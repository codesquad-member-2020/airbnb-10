import React from "react";

import Nav from "./components/nav/Nav.jsx";
import Header from "./components/header/Header.jsx";
import Rooms from "./components/rooms/Rooms.jsx";

import { GlobalStyle } from "./style/GlobalStyle.jsx";
import styled from "styled-components";

import { Route } from "react-router-dom";

const App = () => {
  return (
    <Wrap>
      <GlobalStyle />
      <Route path="/" component={Nav} />
      <Route path="/" component={Header} />
      <Route patch="/rooms" component={Rooms} />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 0 auto;
  padding: 0 50px;
`;

export default App;
