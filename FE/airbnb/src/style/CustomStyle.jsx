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
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 50%;
  border: 1px solid var(--gray-1);
  font-size: 2rem;
  outline: none;
  color: var(--gray-1);
  :hover {
    color: var(--black);
  }
`;

export const ToggleWrap = styled.div`
  display: flex;

  background-color: #fff;
  border-radius: 5%;
  border: 1px solid var(--gray-1);
  box-shadow: var(--box-shadow);
`;
