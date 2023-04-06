import React from "react";
import styled from "styled-components";

const Login = ({ text }) => {
  return <LoginWarp>{text}</LoginWarp>;
};

const LoginWarp = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

export default Login;
