import React from "react";
import { GlobalStyle } from "./style/GlobalStyle.jsx";
import Nav from "./components/nav/Nav.jsx";
import Header from "./components/header/Header.jsx";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Nav />
      <Header />
    </div>
  );
};

export default App;
