import { SafeAreaView } from "react-native-safe-area-context";

import { TaskList } from "@/components/TaskList";

export default function Today() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <TaskList period="today" />
    </SafeAreaView>
  );
}