import styled, { css } from "styled-components";
import { CellState } from "../../enums/CellState";

export const Board = styled.div`
  border: 4px solid #c5c5c5;
  border-radius: 2px;
  background-color: #c5c5c5;

  user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  & * {
    user-select: none;
    -webkit-user-drag: none;
    -moz-user-select: none;
  }
`;

export const Cell = styled.div<{ state: CellState }>`
  width: 50px;
  height: 50px;
  margin: 2px;
  background-color: ${({ state }) =>
    state === CellState.OPEN ? "white" : "#eaeaea"
  };
  border-radius: 4px;
  overflow: hidden;

  ${({ state }) => state !== CellState.OPEN && css`
    :hover {
      background-color: #d5d5d5 !important;
      cursor: pointer;
    };
  `}

  div {
    display: block;
    transition: background-color 0.15s ease;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      transition: background-color 0.15s ease;
    }
  };
`;