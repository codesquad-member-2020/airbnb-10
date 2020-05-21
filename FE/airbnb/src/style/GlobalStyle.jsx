import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const variables = css`
  :root {
    --gray-1: #d2d2d2;
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
