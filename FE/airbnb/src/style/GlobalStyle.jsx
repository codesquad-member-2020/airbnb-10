import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    font-size: 1rem;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
  }

`;

export default GlobalStyle;
