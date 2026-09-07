import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "@/models/Task";

const STORAGE_KEY = "@tasks:v1";

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Erro ao carregar tarefas", error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Erro ao salvar tarefas", error);
  }
}