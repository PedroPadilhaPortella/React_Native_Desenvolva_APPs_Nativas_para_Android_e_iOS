import { Pressable, StyleSheet, Text, View } from "react-native";

import Flag from "./Flag";

type HeaderProps = {
  flagsLeft: number;
  flagPress: () => void;
  startNewGame: () => void;
};

export default function Header({
  flagsLeft,
  flagPress,
  startNewGame,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.flagContainer}>
        <Pressable style={styles.flagButton} onPress={flagPress}>
          <Flag bigger />
        </Pressable>
        <Text style={styles.flagLabel}>= {flagsLeft}</Text>
      </View>
      <Pressable style={styles.newGameButton} onPress={startNewGame}>
        <Text style={styles.newGameLabel}>New Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#eee",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  flagContainer: {
    flexDirection: "row",
  },
  flagButton: {
    marginTop: 10,
    minWidth: 30,
  },
  flagLabel: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 5,
    marginLeft: 10,
  },
  newGameButton: {
    backgroundColor: "#999",
    padding: 5,
  },
  newGameLabel: {
    fontSize: 20,
    color: "#ddd",
    fontWeight: "bold",
  },
});
