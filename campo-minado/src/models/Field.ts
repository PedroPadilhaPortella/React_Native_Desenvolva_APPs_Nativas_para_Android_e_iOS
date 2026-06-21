export type Field = {
  row: number;
  column: number;
  isMined: boolean;
  isOpen: boolean;
  isExploded: boolean;
  isFlagged: boolean;
  nearMinesCount: number;
};
