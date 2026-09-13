import { server, showError } from "@/lib/common";
import moment from "moment";
import axios from "axios";

import { Period } from "@/components/TaskList";
import { Task } from "@/models/Task";

export async function loadTasks(period: Period): Promise<Task[]> {
  try {
    const { minDate, maxDate } = getDateRange(period);
    const response = await axios.get(`${server}/tasks`, {
      params: {
        ...(minDate ? { minDate: minDate.format("YYYY-MM-DD HH:mm:ss") } : {}),
        maxDate: maxDate.format("YYYY-MM-DD HH:mm:ss"),
        ...(period === "delayed" ? { onlyPending: true } : {}),
      },
    });
    return response.data ?? [];
  } catch (error) {
    showError(error);
    return [];
  }
}

export async function saveTask(
  desc: string,
  estimateAt: string,
): Promise<Task | null> {
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

function getDateRange(period: Period) {
  const now = moment();

  switch (period) {
    case "delayed":
      return {
        minDate: null,
        maxDate: now.clone().subtract(1, "day").endOf("day"),
      };
    case "today":
      return {
        minDate: now.clone().startOf("day"),
        maxDate: now.clone().endOf("day"),
      };
    case "tomorrow":
      return {
        minDate: now.clone().add(1, "day").startOf("day"),
        maxDate: now.clone().add(1, "day").endOf("day"),
      };
    case "week":
      return {
        minDate: now.clone().add(2, "day").startOf("day"),
        maxDate: now.clone().endOf("week"),
      };
    case "month":
      return {
        minDate: now.clone().endOf("week").add(1, "day").startOf("day"),
        maxDate: now.clone().endOf("month"),
      };
  }
}
