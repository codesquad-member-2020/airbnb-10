import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./Login.jsx";
import airbnbLogo from "../../assets/airbnbLogo.jpg";
import { useHistory } from "react-router";

const Nav = ({ location }) => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  const testOnClickHandler = () => {
    history.push("/");
    history.go();
  };

  return (
    <NavWarp>
      <LogoWrap onClick={testOnClickHandler}>
        <Logo src={airbnbLogo} />
      </LogoWrap>
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

const LogoWrap = styled.div`
  height: 100%;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 100%;
`;

export default Nav;
