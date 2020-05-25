import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./Login.jsx";
import airbnbLogo from "../../assets/airbnbLogo.jpg";

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavWarp>
      <Logo src={airbnbLogo} />
      <Login text="로그인" />
    </NavWarp>
  );
};

const NavWarp = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  padding: 0 15px;
`;

const Logo = styled.img`
  height: 100%;
`;

export default Nav;
