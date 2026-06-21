import { Field } from "./models/Field";
import { params } from "./params";

const createMineBoard = (rows: number, columns: number, minesCount: number) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesCount);
  return board;
};

const createBoard = (rows: number, columns: number) => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            row,
            column,
            isOpen: false,
            isFlagged: false,
            isMined: false,
            isExploded: false,
            nearMinesCount: 0,
          } as Field;
        });
    });
};

const spreadMines = (board: Field[][], minesCount: number) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < minesCount) {
    const rowCell = Math.floor(Math.random() * rows);
    const colCell = Math.floor(Math.random() * columns);

    if (!board[rowCell][colCell].isMined) {
      board[rowCell][colCell].isMined = true;
      minesPlanted++;
    }
  }
};

const calculateMinesCount = () => {
  const rows = params.getRowsAmount();
  const columns = params.getColumnsAmount();
  return Math.ceil(columns * rows * params.difficultLevel);
};

const cloneBoard = (board: Field[][]) => {
  return board.map((rows) => {
    return rows.map((field) => {
      return { ...field };
    });
  });
};

const getNeighbors = (board: Field[][], row: number, column: number) => {
  const neighbors: Field[] = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];

  rows.forEach((r) => {
    columns.forEach((c) => {
      const isDifferent = row != r || column != c;
      const isValidRow = r >= 0 && r < board.length;
      const isValidColumn = c >= 0 && c < board[0].length;

      if (isDifferent && isValidRow && isValidColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });

  return neighbors;
};

const isNeighborhoodSafe = (board: Field[][], row: number, column: number) => {
  const safes = (result: boolean, neighbor: Field) =>
    result && !neighbor.isMined;
  return getNeighbors(board, row, column).reduce(safes, true);
};

const openField = (board: Field[][], row: number, column: number) => {
  const field = board[row][column];

  if (field.isFlagged) return;

  if (!field.isOpen) {
    field.isOpen = true;
    if (field.isMined) {
      field.isExploded = true;
    } else if (isNeighborhoodSafe(board, row, column)) {
      getNeighbors(board, row, column).forEach((n) => {
        openField(board, n.row, n.column);
      });
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMinesCount = neighbors.filter((n) => n.isMined).length;
    }
  }
};

const fields = (board: Field[][]): Field[] => board.flat();

const hasExploded = (board: Field[][]): boolean =>
  fields(board).filter((field) => field.isExploded).length > 0;

const allSafeFieldsOpen = (board: Field[][]): boolean =>
  fields(board).every((field) => field.isMined || field.isOpen);

const allMinesFlagged = (board: Field[][]): boolean =>
  fields(board)
    .filter((field) => field.isMined)
    .every((field) => field.isFlagged);

const wonGame = (board: Field[][]): boolean =>
  allSafeFieldsOpen(board) || allMinesFlagged(board);

const showMines = (board: Field[][]) =>
  fields(board)
    .filter((field) => field.isMined)
    .forEach((field) => (field.isOpen = true));

const toggleFlag = (board: Field[][], row: number, column: number) => {
  const field = board[row][column];

  if (field.isOpen) return;

  field.isFlagged = !field.isFlagged;
};

const usedFlags = (board: Field[][]) =>
  fields(board).filter((field) => field.isFlagged).length;

export {
  calculateMinesCount,
  cloneBoard,
  createMineBoard,
  hasExploded,
  openField,
  showMines,
  toggleFlag,
  usedFlags,
  wonGame
};

