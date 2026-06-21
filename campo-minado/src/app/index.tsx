import { useState } from "react";
import { StyleSheet, View } from "react-native";

import GameOverModal from "@/components/GameOverModal";
import Header from "@/components/Header";
import LevelSelectorModal from "@/components/LevelSelectorModal";
import MineField from "@/components/MineField";
import { Field } from "@/models/Field";
import { params } from "@/params";
import {
  calculateMinesCount,
  cloneBoard,
  createMineBoard,
  hasExploded,
  openField,
  showMines,
  toggleFlag,
  usedFlags,
  wonGame,
} from "@/utils";

type GameState = {
  board: Field[][];
  won: boolean;
  lost: boolean;
  showLevelSelectorModal: boolean;
};

const createState = (): GameState => {
  const rowsCount = params.getRowsAmount();
  const columnsCount = params.getColumnsAmount();

  return {
    board: createMineBoard(rowsCount, columnsCount, calculateMinesCount()),
    won: false,
    lost: false,
    showLevelSelectorModal: false,
  };
};

export default function Index() {
  const [state, setState] = useState<GameState>(createState());

  const board = createMineBoard(
    params.getRowsAmount(),
    params.getColumnsAmount(),
    calculateMinesCount(),
  );

  const onOpenField = (row: number, column: number) => {
    const board = cloneBoard(state.board);
    openField(board, row, column);

    const hasLost = hasExploded(board);
    const hasWon = wonGame(board);

    if (hasLost) {
      showMines(board);
    }

    setState({ ...state, board, lost: hasLost, won: hasWon });
  };

  const onSelectField = (row: number, column: number) => {
    const board = cloneBoard(state.board);
    toggleFlag(board, row, column);

    const hasWon = wonGame(board);

    setState({ ...state, board, won: hasWon });
  };

  const openLevelSelector = () => {
    setState({ ...state, showLevelSelectorModal: true });
  };

  const closeLevelSelector = () => {
    setState({ ...state, showLevelSelectorModal: false });
  };

  const onLevelSelect = (level: number) => {
    params.difficultLevel = level;
    setState(createState());
  };

  const startNewGame = () => setState(createState());

  return (
    <View style={styles.container}>
      <Header
        startNewGame={startNewGame}
        flagsLeft={calculateMinesCount() - usedFlags(state.board)}
        flagPress={() => openLevelSelector()}
      />
      <View style={styles.board}>
        <MineField
          board={state.board}
          openField={onOpenField}
          selectField={onSelectField}
        />
        <LevelSelectorModal
          visible={state.showLevelSelectorModal}
          onClose={closeLevelSelector}
          selectLevel={onLevelSelect}
        />
        <GameOverModal
          visible={state.won || state.lost}
          won={state.won}
          onPlayAgain={startNewGame}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#aaa",
  },
});
