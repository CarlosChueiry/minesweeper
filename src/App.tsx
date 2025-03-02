import { ChangeEvent, useState } from "react";
import GameBoard, { BoardCell } from "./components/GameBoard/GameBoard"
import Input from "./components/Input"
import { Container, Stack } from "./styles/Global"
import { CellValue } from "./enums/CellValue";

type MineSweeperConfig = {
  rows: string;
  columns: string;
  bombCount: string;
}

function App() {
  const [gameConfig, setGameConfig] = useState<MineSweeperConfig>({ rows: "", columns: "", bombCount: "" })
  const [boardData, setBoardData] = useState<BoardCell[][] | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setGameConfig((prevState) => ({ ...prevState, [name]: value }))
  }

  const generateMineSweeper = (config: MineSweeperConfig): void => {
    const rows = Number(config.rows)
    const columns = Number(config.columns)
    const bombCount = Number(config.bombCount)

    const generatedBoardData: BoardCell[][] = []
    for (let row = 0; row < rows; row++) {
      const rowData: BoardCell[] = []
      for (let column = 0; column < columns; column++) {
        rowData.push({ row, column, value: CellValue.EMPTY })
      }
      generatedBoardData.push(rowData)
    }

    for (let bomb = 0; bomb < bombCount; bomb++) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomColumn = Math.floor(Math.random() * columns);
      if (generatedBoardData[randomRow][randomColumn].value !== CellValue.BOMB) {
        generatedBoardData[randomRow][randomColumn].value = CellValue.BOMB
        const adjacentPositions = [
          [randomRow - 1, randomColumn - 1], // TOP LEFT
          [randomRow - 1, randomColumn], // TOP
          [randomRow - 1, randomColumn + 1], // TOP RIGHT
          [randomRow, randomColumn - 1], // LEFT
          [randomRow, randomColumn + 1], // RIGHT
          [randomRow + 1, randomColumn - 1], // BOTTOM LEFT
          [randomRow + 1, randomColumn], // BOTTOM
          [randomRow + 1, randomColumn + 1], // BOTTOM RIGHT
        ]

        adjacentPositions.forEach(([adjRow, adjColumn]) => {
          if (adjRow < 0 || adjRow > rows - 1) return;
          if (adjColumn < 0 || adjColumn > columns - 1) return;
          if (generatedBoardData[adjRow][adjColumn].value !== CellValue.BOMB) {
            generatedBoardData[adjRow][adjColumn].value++;
          }
        })
      }
    }

    setBoardData(generatedBoardData)
  }

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
      {boardData && <GameBoard boardData={boardData} />}
    </Container>
  )
}

export default App
