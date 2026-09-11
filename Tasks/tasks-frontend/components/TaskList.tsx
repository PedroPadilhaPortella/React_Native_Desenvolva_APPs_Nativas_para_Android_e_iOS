import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, StyleSheet, View, FlatList, Pressable } from "react-native";

import { loadTasks, removeTask, saveTask, toggleTask } from "@/lib/tasksService";
import { AddTaskModal } from "./AddTaskModal";
import { TaskItem } from "./TaskItem";
import { Task } from "@/models/Task";

import tomorrowImage from "../assets/images/tomorrow.jpg";
import todayImage from "../assets/images/today.jpg";
import monthImage from "../assets/images/month.jpg";
import weekImage from "../assets/images/week.jpg";
import { showError } from "@/lib/common";

export type Period = "today" | "tomorrow" | "week" | "month";

const LABELS: Record<Period, string> = {
  today: "Hoje",
  tomorrow: "Amanhã",
  week: "Semana",
  month: "Mês",
};

const IMAGES: Record<Period, any> = {
  today: todayImage,
  tomorrow: tomorrowImage,
  week: weekImage,
  month: monthImage,
};

function getFormattedDate() {
  const date = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(new Date());
  return date.charAt(0).toUpperCase() + date.slice(1);
}

export function TaskList({ period }: { period: Period }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  const visibleTasks = useMemo(
    () => tasks.filter((t) => showCompleted || !t.doneAt),
    [tasks, showCompleted],
  );

  const handleToggle = async(id: string) => {
    const updatedTask = await toggleTask(id);

    if (updatedTask) {
      setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
    }
  };

  const handleDelete = async(id: string) => {
    await removeTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAdd = async (desc: string, date: Date) => {
    if (desc.trim() === "" || !date) {
      showError("Informações inválidas. Por favor, preencha todos os campos.");
      return;
    }

    const newTask = await saveTask(desc, date.toISOString());
    if (newTask) {
      setTasks((prev) => [...prev, newTask]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={IMAGES[period]}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          contentPosition="top"
        />
        <Pressable
          style={styles.toggleButton}
          onPress={() => setShowCompleted((prev) => !prev)}
        >
          <Ionicons
            name={showCompleted ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="#fff"
          />
        </Pressable>
        <View style={styles.date}>
          <Text style={styles.title}>{LABELS[period]}</Text>
          <Text style={styles.subtitle}>{getFormattedDate()}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        />
      </View>
      <Pressable style={styles.newTask} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
    justifyContent: "flex-end",
  },
  toggleButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  date: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: "Lato",
    fontSize: 50,
    fontWeight: "300",
    color: "#fff",
  },
  subtitle: {
    fontSize: 15,
    color: "#fff",
    marginTop: 4,
    fontFamily: "Lato",
  },
  content: {
    flex: 7,
  },
  newTask: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4caf50",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
