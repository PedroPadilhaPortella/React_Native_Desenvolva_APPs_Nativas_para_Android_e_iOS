import { Pressable, StyleSheet, Text, View } from "react-native";

import { params } from "@/params";
import Flag from "./Flag";
import Mine from "./Mine";

type FieldProps = {
  isMined?: boolean;
  isOpen?: boolean;
  isExploded?: boolean;
  isFlagged?: boolean;
  nearMinesCount?: number;
  openField: () => void;
  selectField: () => void;
};

export default function Field({
  isOpen = false,
  isMined = false,
  isExploded = false,
  isFlagged = false,
  nearMinesCount = 0,
  openField,
  selectField,
}: FieldProps) {
  const fieldStyles: any[] = [styles.field];

  if (isOpen) fieldStyles.push(styles.opened);

  if (isExploded) fieldStyles.push(styles.exploded);

  if (isFlagged) fieldStyles.push(styles.flagged);

  if (!isOpen && !isExploded) fieldStyles.push(styles.regular);

  let color: string = "";

  if (nearMinesCount > 0) {
    if (nearMinesCount == 1) color = "#2a28d7";
    if (nearMinesCount == 2) color = "#2b520f";
    if (nearMinesCount > 2 && nearMinesCount < 6) color = "#ffff11";
    if (nearMinesCount >= 6) color = "#cc0000";
  }

  return (
    <Pressable onPress={openField} onLongPress={selectField}>
      <View style={fieldStyles}>
        {!isMined && isOpen && nearMinesCount > 0 ? (
          <Text style={[styles.label, { color: color }]}>{nearMinesCount}</Text>
        ) : null}
        {isMined && isOpen ? <Mine /> : null}
        {isFlagged && !isOpen ? <Flag /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderWidth,
  },
  regular: {
    backgroundColor: "#999",
    borderLeftColor: "#ccc",
    borderTopColor: "#ccc",
    borderRightColor: "#333",
    borderBottomColor: "#333",
  },
  opened: {
    backgroundColor: "#999",
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
  },
  exploded: {
    backgroundColor: "#cc0000",
    borderColor: "#cc0000",
  },
  flagged: {},
  label: {
    fontSize: params.fontSize,
    fontWeight: "bold",
  },
});
