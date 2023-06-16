import React from 'react'
import { Row } from 'src/components/interfaces/Row'
import { Column } from "src/components/interfaces/Column"
import GameColumn from "src/components/GameColumn"


interface Props {
    row: Row;
    updateBoard: (columnIndex: number) => void
}

const GameRow: React.FC<Props> = ({row, updateBoard}: Props): JSX.Element => {
  return (
    <tr>
            {row.columns.map((column: Column, i: number): JSX.Element => (<GameColumn key={i} columnIndex={i} column={column} updateBoard={updateBoard} />))}
    </tr>
  )
}
export default GameRow;
