import AsyncStorage from "@react-native-async-storage/async-storage";
import { server, showError } from '@/lib/common';
import moment from "moment";
import axios from 'axios';

import { Task } from "@/models/Task";

export async function loadTasks(): Promise<Task[]> {
  try {
    const maxDate = moment().endOf("day").format('YYYY-MM-DD 23:59:59');
    const response = await axios.get(`${server}/tasks?date=${maxDate}`)
    return response.data ?? [];
  } catch (error) {
    showError(error);
    return [];
  }
}

export async function saveTask(desc: string, estimateAt: string): Promise<Task | null> {
  try {
    const response = await axios.post(`${server}/tasks`, { desc, estimateAt });
    return response.data;
  } catch (error) {
    showError(error);
    return null;
  }
}

export async function toggleTask(id: string): Promise<Task | null> {
  try {
    const response = await axios.put(`${server}/tasks/${id}/toggle`);
    return response.data;
  } catch (error) {
    showError(error);
    return null;
  }
}

export async function removeTask(id: string): Promise<void | null> {
  try {
    await axios.delete(`${server}/tasks/${id}`);
  } catch (error) {
    showError(error);
    return null;
  }
}