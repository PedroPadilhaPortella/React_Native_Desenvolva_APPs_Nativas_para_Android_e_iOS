import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export function DrawerContent(props: DrawerContentComponentProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/login");
  }
  
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>

        <View style={styles.header}>
          <View style={styles.avatarRow}>
            <Ionicons name="person-circle-outline" size={44} color="#2f6fed" />
            <Pressable style={styles.logoutButton} onPress={logout}>
              <Ionicons name="exit-outline" size={22} color="#c0392b" />
            </Pressable>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logoutButton: {
    padding: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  email: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
});
