import { ChangeEvent, useState } from "react";
import GameBoard, { BoardCell } from "./components/GameBoard/GameBoard"
import Input from "./components/Input"
import { Container, Stack } from "./styles/Global"

type MineSweeperConfig = {
  rows: string;
  columns: string;
  bombs: string;
}

function App() {
  const [gameConfig, setGameConfig] = useState<MineSweeperConfig>({ rows: "", columns: "", bombs: "" })
  const [boardData, setBoardData] = useState<BoardCell[][] | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setGameConfig((prevState) => ({ ...prevState, [name]: value }))
  }

  const generateMineSweeper = (config: MineSweeperConfig): void => {
    const rows = Number(config.rows)
    const columns = Number(config.columns)
    const generatedBoardData = []
    for (let row = 0; row < rows; row++) {
      const rowData = []
      for (let column = 0; column < columns; column++) {
        rowData.push({ row, column })
      }
      generatedBoardData.push(rowData)
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
          name="bombs"
          placeholder="Nº de bombas"
          value={gameConfig.bombs}
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
