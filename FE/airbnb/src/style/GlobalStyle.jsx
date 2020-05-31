import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const variables = css`
  :root {
    --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    /* color */
    --gray-1: #d2d2d2;
    --gray-2: #848080;
    --black: #000;
    --white: #fff;
    --mainColor: #fc3962;
    --subColor: #248bdb;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${variables}
  
  * {
    font-size: 1rem;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
  
  }
  
 button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  background: transparent;
 }

`;

export default GlobalStyle;
