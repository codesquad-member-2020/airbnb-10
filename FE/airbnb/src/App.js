import React from "react";
import { GlobalStyle } from "./style/GlobalStyle.jsx";
import Nav from "./components/nav/Nav.jsx";
import Header from "./components/header/Header.jsx";

import Rooms from "./components/rooms/Rooms.jsx";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Nav />
      {/* <Header /> */}
      <Rooms />
    </div>
  );
};

export default App;
