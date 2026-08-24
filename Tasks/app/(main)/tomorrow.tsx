import { SafeAreaView } from "react-native-safe-area-context";

import { TaskList } from "@/components/TaskList";

export default function Tomorrow() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <TaskList period="tomorrow" />
    </SafeAreaView>
  );
}