import { Dispatch, SetStateAction } from 'react';
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

  return (
    <Board>
      {boardData.map((row: BoardCell[], index: number) => (
        <Stack key={row[index].row} direction="row">
          {row.map((cell: BoardCell) => (
            <Cell
              key={`${cell.row}-${cell.column}`}
              id={`${cell.row}-${cell.column}`}
              {...(cell.state === CellState.CLOSED && {
                onClick: () => onCellClick(cell)
              })}
            >
              <span>{cell.state}</span>
            </Cell>
          ))}
        </Stack>
      )
      )}
    </Board>
  )
}