import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type LevelSelectorModalProps = {
  visible: boolean;
  onClose: () => void;
  selectLevel: (value: number) => void;
};

export default function LevelSelectorModal({
  visible,
  onClose,
  selectLevel,
}: LevelSelectorModalProps) {
  return (
    <Modal
      onRequestClose={onClose}
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.frame}>
        <View style={styles.container}>
          <Text style={styles.title}>Select the level</Text>
          <Pressable
            style={[styles.button, styles.bgEasy]}
            onPress={() => selectLevel(0.1)}
          >
            <Text style={styles.buttonLabel}>Easy</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.bgNormal]}
            onPress={() => selectLevel(0.2)}
          >
            <Text style={styles.buttonLabel}>Normal</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.bgHard]}
            onPress={() => selectLevel(0.3)}
          >
            <Text style={styles.buttonLabel}>Hard</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6",
  },
  container: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
  buttonLabel: {
    fontSize: 20,
    color: "#eee",
    fontWeight: "bold",
  },
  bgEasy: {
    backgroundColor: "#49b65d",
  },
  bgNormal: {
    backgroundColor: "#2765f7",
  },
  bgHard: {
    backgroundColor: "#f26337",
  },
});
