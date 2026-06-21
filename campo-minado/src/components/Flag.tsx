import { StyleSheet, View } from "react-native";

type FlagProps = {
  bigger?: boolean;
};

export default function Flag({ bigger = false }: FlagProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.flagpole, bigger ? styles.biggerFlagpole : null]} />
      <View style={[styles.flag, bigger ? styles.biggerFlag : null]} />
      <View style={[styles.base1, bigger ? styles.biggerBase1 : null]} />
      <View style={[styles.base2, bigger ? styles.biggerBase2 : null]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  flagpole: {
    position: "absolute",
    height: 14,
    width: 2,
    backgroundColor: "#222",
    marginLeft: 9,
  },
  flag: {
    position: "absolute",
    height: 5,
    width: 6,
    backgroundColor: "#ff2222",
    marginLeft: 3,
  },
  base1: {
    position: "absolute",
    height: 2,
    width: 6,
    backgroundColor: "#222",
    marginLeft: 7,
    marginTop: 10,
  },
  base2: {
    position: "absolute",
    height: 2,
    width: 10,
    backgroundColor: "#222",
    marginLeft: 5,
    marginTop: 12,
  },
  biggerFlagpole: {
    height: 21,
    width: 3,
    marginLeft: 13,
  },
  biggerFlag: {
    height: 8,
    width: 9,
    marginLeft: 5,
  },
  biggerBase1: {
    height: 3,
    width: 9,
    marginLeft: 10,
    marginTop: 15,
  },
  biggerBase2: {
    height: 3,
    width: 15,
    marginLeft: 8,
    marginTop: 18,
  },
});
