import { Dispatch, JSX, SetStateAction } from 'react';
import { CellState } from '../../enums/CellState';
import { CellValue } from '../../enums/CellValue';
import { Stack } from '../../styles/Global';
import { Board, Cell } from './styles'

export type BoardCell = {
  row: number;
  column: number;
  value: CellValue;
  state: CellState;
}

type Props = {
  boardData: BoardCell[][];
  setBoardData: Dispatch<SetStateAction<BoardCell[][]>>
}

export default function GameBoard({ boardData, setBoardData }: Props) {
  const onCellClick = (cell: BoardCell): void => {
    setBoardData((prevState: BoardCell[][]) => {
      const updatedBoard = prevState.map((row, rowIndex) => {
        if (rowIndex !== cell.row) return row;
        return row.map((cellData, columnIndex) => {
          if (columnIndex !== cell.column) return cellData;
          return { ...cellData, state: CellState.OPEN }
        })
      })
      return updatedBoard
    })
  };

  const renderCellContent = (cell: BoardCell): JSX.Element => {
    if (cell.state === CellState.CLOSED || cell.value === CellValue.EMPTY) {
      return <div></div>
    }
    if (cell.value === CellValue.BOMB) {
      return (
        <div>
          <img src="/assets/bomb.svg" alt="Bomb icon" width="100%" height="100%" />
        </div>
      )
    }
    return <div>{cell.value}</div>
  }

  return (
    <Board onContextMenu={(e) => e.preventDefault()}>
      {boardData.map((row: BoardCell[], index: number) => (
        <Stack key={row[index].row} direction="row">
          {row.map((cell: BoardCell) => (
            <Cell
              key={`${cell.row}-${cell.column}`}
              id={`${cell.row}-${cell.column}`}
              state={cell.state}
              {...(cell.state === CellState.CLOSED && {
                onClick: () => onCellClick(cell)
              })}
            >
              {renderCellContent(cell)}
            </Cell>
          ))}
        </Stack>
      )
      )}
    </Board>
  )
}