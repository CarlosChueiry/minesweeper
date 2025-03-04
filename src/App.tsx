import { ChangeEvent, useState } from "react";
import GameBoard, { BoardCell } from "./components/GameBoard/GameBoard";
import Input from "./components/Input";
import { Container, Stack } from "./styles/Global";
import { CellValue } from "./enums/CellValue";
import { CellState } from "./enums/CellState";
import { CellFlag } from "./enums/CellFlag";

type MineSweeperConfig = {
  rows: string;
  columns: string;
  bombCount: string;
};

function App() {
  const [gameConfig, setGameConfig] = useState<MineSweeperConfig>({ rows: "", columns: "", bombCount: "" });
  const [boardData, setBoardData] = useState<BoardCell[][]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setGameConfig((prevState) => ({ ...prevState, [name]: value }));
  }

  const generateInitialBoard = (
    rowQuantity: number,
    columnQuantity: number
  ): BoardCell[][] => {
    const initialBoard: BoardCell[][] = [];
    for (let row = 0; row < rowQuantity; row++) {
      const rowData: BoardCell[] = [];
      for (let column = 0; column < columnQuantity; column++) {
        rowData.push({
          row,
          column,
          value: CellValue.EMPTY,
          state: CellState.CLOSED,
          flag: CellFlag.NONE
        });
      };
      initialBoard.push(rowData);
    };
    return initialBoard;
  }

  const insertBombs = (
    rowQuantity: number,
    columnQuantity: number,
    bombQuantity: number,
    initialBoardData: BoardCell[][]
  ): BoardCell[][] => {
    const boardWithBombs = initialBoardData;
    for (let bomb = 0; bomb < bombQuantity; bomb++) {
      const randomRow = Math.floor(Math.random() * rowQuantity);
      const randomColumn = Math.floor(Math.random() * columnQuantity);
      if (boardWithBombs[randomRow][randomColumn].value !== CellValue.BOMB) {
        boardWithBombs[randomRow][randomColumn].value = CellValue.BOMB;
        const adjacentPositions = [
          [randomRow - 1, randomColumn - 1], // TOP LEFT
          [randomRow - 1, randomColumn], // TOP
          [randomRow - 1, randomColumn + 1], // TOP RIGHT
          [randomRow, randomColumn - 1], // LEFT
          [randomRow, randomColumn + 1], // RIGHT
          [randomRow + 1, randomColumn - 1], // BOTTOM LEFT
          [randomRow + 1, randomColumn], // BOTTOM
          [randomRow + 1, randomColumn + 1], // BOTTOM RIGHT
        ];

        adjacentPositions.forEach(([adjRow, adjColumn]) => {
          if (adjRow < 0 || adjRow > rowQuantity - 1) return;
          if (adjColumn < 0 || adjColumn > columnQuantity - 1) return;
          if (boardWithBombs[adjRow][adjColumn].value !== CellValue.BOMB) {
            boardWithBombs[adjRow][adjColumn].value++;
          };
        });
      };
    };
    return boardWithBombs;
  };

  const generateMineSweeper = (config: MineSweeperConfig): void => {
    const rows = Number(config.rows);
    const columns = Number(config.columns);
    const bombCount = Number(config.bombCount);

    const initialBoardData = generateInitialBoard(rows, columns);
    const boardWithBombs = insertBombs(rows, columns, bombCount, initialBoardData)

    setBoardData(boardWithBombs);
  };

  return (
    <Container>
      <h1>Mine Sweeper</h1>
      <Stack direction="row" spacing={8} style={{ marginBottom: '16px' }}>
        <Input
          id="rowConfig"
          name="rows"
          placeholder="Nº de linhas"
          value={gameConfig.rows}
          onChange={onChange}
          type="number"
        />
        <Input
          id="columnConfig"
          name="columns"
          placeholder="Nº de colunas"
          value={gameConfig.columns}
          onChange={onChange}
          type="number"
        />
        <Input
          id="bombConfig"
          name="bombCount"
          placeholder="Nº de bombas"
          value={gameConfig.bombCount}
          onChange={onChange}
          type="number"
        />
        <button onClick={() => generateMineSweeper(gameConfig)}>Create</button>
      </Stack>
      {boardData && <GameBoard boardData={boardData} setBoardData={setBoardData} />}
    </Container>
  )
}

export default App
