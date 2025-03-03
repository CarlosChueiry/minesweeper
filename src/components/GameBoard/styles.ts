import styled from "styled-components";

export const Board = styled.div`
  border: 4px solid #e0e0e0;
  border-radius: 2px;
  background-color: #e0e0e0;
`;

export const Cell = styled.div`
  width: 50px;
  height: 50px;
  margin: 2px;
  background-color: #f5f5f5;
  border-radius: 4px;

  :hover {
    background-color: #ececec !important;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  };

  span {
    display: block;
    transition: background-color 0.15s ease;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  };
`;