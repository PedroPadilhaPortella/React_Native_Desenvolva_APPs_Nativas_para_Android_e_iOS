import { StyleSheet, View } from "react-native";

import { Field as FieldModel } from "@/models/Field";
import Field from "./Field";

type MineFieldProps = {
  board: FieldModel[][];
  openField: (row: number, column: number) => void;
  selectField: (row: number, column: number) => void;
};

export default function MineField({
  board,
  openField,
  selectField,
}: MineFieldProps) {
  const rows = board.map((row, i) => {
    const columns = row.map((field, j) => {
      return (
        <Field
          key={`col-${j}`}
          {...field}
          openField={() => openField(i, j)}
          selectField={() => selectField(i, j)}
        />
      );
    });

    return (
      <View key={`row-${i}`} style={styles.rowContainer}>
        {columns}
      </View>
    );
  });

  return <View style={styles.container}>{rows}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
  },
  rowContainer: {
    flexDirection: "row",
  },
});
