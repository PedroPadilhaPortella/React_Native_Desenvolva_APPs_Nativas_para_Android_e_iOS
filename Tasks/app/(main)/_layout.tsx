import { Drawer } from "expo-router/drawer";
import { DrawerContent } from "@/components/DrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props: any) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name="index"
        options={{ swipeEnabled: false, drawerItemStyle: { display: "none" }, headerShown: false }}
      />
      <Drawer.Screen name="today" options={{ title: "Hoje" }} />
      <Drawer.Screen name="tomorrow" options={{ title: "Amanhã" }} />
      <Drawer.Screen name="week" options={{ title: "Semana" }} />
      <Drawer.Screen name="month" options={{ title: "Mês" }} />
    </Drawer>
  );
}