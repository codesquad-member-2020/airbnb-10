import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./Login.jsx";

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavWarp>
      <Title>aribnb</Title>
      <Login text="로그인" />
    </NavWarp>
  );
};

const NavWarp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
`;

const Title = styled.div`
  padding: 0 15px;
  font-weight: bold;
  font-size: 1.5rem;
`;

export default Nav;
