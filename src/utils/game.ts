import { Board } from "../components/interfaces/Board";
import { Row } from "../components/interfaces/Row";
import { Column } from "../components/interfaces/Column";

export const isDraw = (board: Board): boolean => {
  let isBoardFilled: boolean =
    board.rows.filter(
      (row: Row) =>
        row.columns.filter((column: Column) => column.player === null).length >
        0
    ).length > 0
      ? false
      : true;
  return isBoardFilled;
};
