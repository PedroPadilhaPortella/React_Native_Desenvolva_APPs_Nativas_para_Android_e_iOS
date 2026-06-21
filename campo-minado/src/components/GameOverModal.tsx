import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type GameOverModalProps = {
  visible: boolean;
  won: boolean;
  onPlayAgain: () => void;
};

export default function GameOverModal({
  visible,
  won,
  onPlayAgain,
}: GameOverModalProps) {
  const [displayWon, setDisplayWon] = useState(won);

  useEffect(() => {
    if (visible) {
      setDisplayWon(won);
    }
  }, [visible, won]);

  return (
    <Modal
      onRequestClose={onPlayAgain}
      visible={visible}
      animationType="fade"
      transparent
    >
      <View style={styles.frame}>
        <View style={[styles.card, won ? styles.cardWon : styles.cardLost]}>
          <Text style={styles.emoji}>{won ? "🏆" : "💥"}</Text>
          <Text style={styles.title}>
            {won ? "Você venceu!" : "Você perdeu!"}
          </Text>
          <Text style={styles.message}>
            {won ? "Parabéns, campo limpo!" : "Tente novamente"}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              won ? styles.buttonWon : styles.buttonLost,
              pressed && styles.buttonPressed,
            ]}
            onPress={onPlayAgain}
          >
            <Text style={styles.buttonText}>Jogar novamente</Text>
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
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardWon: { borderColor: "#2e7d32" },
  cardLost: { borderColor: "#c62828" },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "bold", color: "#222", marginBottom: 4 },
  message: { fontSize: 14, color: "#666", marginBottom: 20 },
  button: { paddingVertical: 12, paddingHorizontal: 28, borderRadius: 8 },
  buttonWon: { backgroundColor: "#2e7d32" },
  buttonLost: { backgroundColor: "#c62828" },
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
