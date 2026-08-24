import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";

import { Task } from "@/models/Task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
const renderDeleteAction = () => (
    <Pressable style={styles.deleteAction} onPress={() => onDelete(task.id)}>
      <Ionicons name="trash-outline" size={22} color="#fff" />
    </Pressable>
  );

  return (
    <Swipeable
      renderLeftActions={renderDeleteAction}
      renderRightActions={renderDeleteAction}
    >
      <Pressable style={styles.container} onPress={() => onToggle(task.id)}>
        <View style={[styles.circle, task.completed && styles.circleChecked]}>
          {task.completed && <Ionicons name="checkmark" size={14} color="#fff" />}
        </View>

        <View style={styles.textWrapper}>
          <Text style={[styles.title, task.completed && styles.titleCompleted]}>
            {task.title}
          </Text>
          <Text style={styles.date}>{task.completed ? 'Completar até ' + task.completedAt : 'Feito em ' + task.estimatedAt}</Text>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
   container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
  },
  circleChecked: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: "Lato",
    color: "#222",
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  date: {
    fontSize: 12,
    fontFamily: "Lato",
    color: "#999",
    marginTop: 2,
  },
  deleteAction: {
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
});
