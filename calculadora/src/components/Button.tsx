import { Dimensions, StyleSheet, Text, TouchableHighlight } from "react-native";

type ButtonProps = {
  label: string;
  onClick: (label: string) => void;
  double?: boolean;
  triple?: boolean;
  operation?: boolean;
};

export default function Button({
  onClick,
  label,
  operation,
  double,
  triple,
}: ButtonProps) {
  const styleButton: any[] = [styles.button];

  if (operation) styleButton.push(styles.operationButton);
  if (double) styleButton.push(styles.doubleButton);
  if (triple) styleButton.push(styles.tripleButton);

  return (
    <TouchableHighlight onPress={() => onClick(label)}>
      <Text style={styleButton}>{label}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    fontSize: 40,
    padding: 20,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#888888",
  },
  operationButton: {
    color: "#fff",
    backgroundColor: "#fa8231",
  },
  doubleButton: {
    width: (Dimensions.get("window").width / 4) * 2,
  },
  tripleButton: {
    width: (Dimensions.get("window").width / 4) * 3,
  },
});
