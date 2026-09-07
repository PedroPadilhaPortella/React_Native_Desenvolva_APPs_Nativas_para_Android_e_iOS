import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, date: Date) => void;
};

export function AddTaskModal({ visible, onClose, onSave }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title.trim(), date);
    setTitle("");
    setDate(new Date());
    onClose();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;

    const [year, month, day] = value.split("-").map(Number);
    const newDate = new Date(year, month - 1, day);

    if (!isNaN(newDate.getTime())) {
      setDate(newDate);
    }
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(date);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.label}>Nova tarefa</Text>

          <TextInput
            style={styles.input}
            placeholder="Descrição da tarefa"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          {Platform.OS !== "web" && (
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.dateButtonText}>{formattedDate}</Text>
            </Pressable>
          )}

          {showPicker && Platform.OS !== "web" && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(_, selectedDate) => {
                setShowPicker(Platform.OS === "ios");
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {Platform.OS === "web" && (
            <input
              style={styles.inputDate}
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          )}

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 30,
  },
  label: {
    fontSize: 18,
    fontFamily: "Lato",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    fontFamily: "Lato",
    marginBottom: 12,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dateButtonText: {
    fontFamily: "Lato",
    fontSize: 15,
    color: "#333",
  },
  inputDate: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: "#ddd",
    fontFamily: "Lato",
    fontSize: 15,
    marginBottom: 16,  
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    fontFamily: "Lato",
    color: "#999",
  },
  saveButton: {
    backgroundColor: "#4caf50",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveText: {
    fontFamily: "Lato",
    color: "#fff",
    fontWeight: "600",
  },
});
