import styled from "styled-components";

export const Button = styled.button`
  box-sizing: border-box;
  font-size: 12px;
  padding: 5px 13px;
  border-radius: 40px;
  border: 1px solid var(--gray-1);
  cursor: pointer;
  box-shadow: var(--box-shadow);
  outline: none;

  :hover {
    border: 2px solid var(--black);
    padding: 4px 12px;
  }
`;

export const CountButton = styled.button`
  padding: 5px;
  border-radius: 50%;
  border: 1px solid var(--gray-1);
`;
