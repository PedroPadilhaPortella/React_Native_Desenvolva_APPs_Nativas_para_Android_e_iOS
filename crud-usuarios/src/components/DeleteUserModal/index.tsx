import {
  Modal as RCModal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { User } from "../../models/User";

type DeleteUserModalProps = {
  visible: boolean;
  user: User | undefined;
  cancelAction: () => void;
  deleteAction: () => void;
};

export function DeleteUserModal({
  visible,
  user,
  cancelAction,
  deleteAction,
}: DeleteUserModalProps) {
  return (
    <RCModal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirmar exclusão</Text>

          <Text style={styles.modalMessage}>
            Tem certeza que deseja excluir o usuário{" "}
            <Text style={{ fontWeight: "bold" }}>{user?.name}</Text>?
          </Text>

          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.modalButton, styles.cancelButton]}
              onPress={cancelAction}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={[styles.modalButton, styles.deleteButton]}
              onPress={deleteAction}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </RCModal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 360,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: "#555",
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#7f8c8d",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
