import React from "react";
import { GlobalStyle } from "./style/GlobalStyle.jsx";
import Nav from "./components/nav/Nav.jsx";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Nav />
    </div>
  );
};

export default App;
