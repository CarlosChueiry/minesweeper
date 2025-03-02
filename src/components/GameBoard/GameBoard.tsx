import { CellValue } from '../../enums/CellValue';
import { Stack } from '../../styles/Global';
import { Board } from './styles'

export type BoardCell = {
  row: number;
  column: number;
  value: CellValue;
}

type Props = {
  boardData: BoardCell[][]
}

export default function GameBoard({ boardData }: Props) {
  return (
    <Board>
      {boardData.map((row: BoardCell[]) => (
        <Stack direction="row">
          {row.map((column: BoardCell) => (
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "red",
                border: '1px solid purple',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span>{column.value}</span>
            </div>
          ))}
        </Stack>
      )
      )}
    </Board>
  )
}