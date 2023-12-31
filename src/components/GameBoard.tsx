import React from "react";
import { useState } from "react";
import { c4Columns, c4Rows } from "./constants";
import { Board } from "src/components/interfaces/Board";
import GameRow from "src/components/GameRow";
import { Row } from "src/components/interfaces/Row";
import { Column } from "src/components/interfaces/Column";
import { isDraw } from "src/utils/game";

const GameBoard: React.FC = (): JSX.Element => {
  const initialBoard: Board = {
    rows: Array.from({ length: c4Rows }, (_, i) => ({
      columns: Array.from({ length: c4Columns }, (_, i) => ({
        player: null,
      })),
    })),
  };
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currPlayer, setCurrPlayer] = useState<number>(1);
  const updateBoard = (columnIndex: number): void => {
    let boardCopy: Board = board;
    let areColumnsFilled: boolean = true;
    let rowIndex: number = 0;
    for (let i: number = 5; i >= 0; i--) {
      let columnPlayer: number | null =
        boardCopy.rows[i].columns[columnIndex].player;
      if (!columnPlayer) {
        boardCopy.rows[i].columns[columnIndex].player = currPlayer;
        areColumnsFilled = false;
        rowIndex = i;
        break;
      }
    }
    if (!areColumnsFilled) {
      setBoard(boardCopy);
      setCurrPlayer(currPlayer == 1 ? 2 : 1);
    }
    if (winCheck(rowIndex, columnIndex)) {
      setBoard(initialBoard);
      alert("Player " + currPlayer + " wins.");
      setCurrPlayer(1);
    } else if (isDraw(board)) {
      setBoard(initialBoard);
      alert("Draw");
      setCurrPlayer(1);
    }
  };
  const winCheck = (rowIndex: number, columnIndex: number): boolean => {
    return (
      checkHorizontal(rowIndex, columnIndex) ||
      checkVertical(rowIndex, columnIndex) ||
      checkDiagonalRight(rowIndex, columnIndex) ||
      checkDiagonalLeft(rowIndex, columnIndex)
    );
  };
  const checkDiagonalLeft = (
    rowIndex: number,
    columnIndex: number
  ): boolean => {
    let consecutiveColumns: number = 0;
    let columnToStartFrom: number = columnIndex;
    let rowToStartFrom: number = rowIndex;
    for (let i: number = 0; i < c4Rows; i++) {
      let column: Column = board.rows[rowIndex - i]?.columns[columnIndex + i];
      if (column) {
        columnToStartFrom = columnIndex + i;
        rowToStartFrom = rowIndex - i;
      } else {
        break;
      }
    }
    // error was at line 67 supposed to be minus instead of plus sign.
    for (let j: number = 0; j < c4Rows; j++) {
      let column: Column =
        board.rows[rowToStartFrom + j]?.columns[columnToStartFrom - j];
      if (column) {
        if (
          column.player === board.rows[rowIndex].columns[columnIndex].player
        ) {
          consecutiveColumns++;
          if (consecutiveColumns >= 4) {
            return true;
          }
        } else {
          consecutiveColumns = 0;
        }
      }
    }
    return false;
  };
  const checkDiagonalRight = (
    rowIndex: number,
    columnIndex: number
  ): boolean => {
    let consecutiveColumns: number = 0;
    let indexDifference: number = rowIndex - columnIndex;
    let columnToStartFrom: number = 0;
    let rowToStartFrom: number = 0;
    if (indexDifference > 0) {
      columnToStartFrom = 0;
      rowToStartFrom = indexDifference;
    } else if (indexDifference !== 0) {
      columnToStartFrom = Math.abs(indexDifference);
    }
    for (let i: number = 0; i < c4Rows; i++) {
      let column: Column =
        board.rows[rowToStartFrom + i]?.columns[columnToStartFrom + i];
      if (column) {
        if (
          column.player === board.rows[rowIndex].columns[columnIndex].player
        ) {
          consecutiveColumns++;
          if (consecutiveColumns >= 4) {
            return true;
          }
        } else {
          consecutiveColumns = 0;
        }
      }
    }
    return false;
  };
  const checkVertical = (rowIndex: number, columnIndex: number): boolean => {
    let row: Row = board.rows[rowIndex];
    let consecutiveColumns: number = 0;
    for (let i: number = 0; i < c4Rows; i++) {
      if (
        board.rows[i].columns[columnIndex].player ===
        row.columns[columnIndex].player
      ) {
        consecutiveColumns++;
        if (consecutiveColumns >= 4) {
          return true;
        }
      } else {
        consecutiveColumns = 0;
      }
    }
    return false;
  };
  const checkHorizontal = (rowIndex: number, columnIndex: number): boolean => {
    let row: Row = board.rows[rowIndex];
    let consecutiveColumns: number = 0;
    for (let i: number = 0; i < c4Columns; i++) {
      if (row.columns[i].player === row.columns[columnIndex].player) {
        consecutiveColumns++;
        if (consecutiveColumns >= 4) {
          return true;
        }
      } else {
        consecutiveColumns = 0;
      }
    }
    return false;
  };
  return (
    <div>
      <button
        className="button"
        onClick={(): void => {
          setBoard(initialBoard);
        }}
      >
        New Game
      </button>
      <table>
        <tbody>
          {board.rows.map(
            (row: Row, i: number): JSX.Element => (
              <GameRow key={i} row={row} updateBoard={updateBoard} />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GameBoard;
