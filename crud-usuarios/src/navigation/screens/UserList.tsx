import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { DeleteUserModal } from "../../components/DeleteUserModal";
import { useUsersManager } from "../../context/UsersContext";
import { User } from "../../models/User";

export function UserList() {
  const { users, deleteUser } = useUsersManager();
  const navigation = useNavigation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDeleteUser = (user: User) => {
    deleteUser(user.id);

    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const confirmDeleteUser = (user: User) => {
    if (Platform.OS === "web") {
      setSelectedUser(user);
      setShowDeleteModal(true);
      return;
    }

    Alert.alert(
      "Confirmar exclusão",
      `Tem certeza que deseja excluir o usuário ${user.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => handleDeleteUser(user),
        },
      ],
    );
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
      return "?";
    }

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const renderUserItem = ({ item }: { item: User }) => {
    return (
      <View style={styles.item}>
        <View style={[styles.avatar, { backgroundColor: item.color }]}> 
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            style={styles.actionButton}
            onPress={() => navigation.navigate("UserForm", { user: item })}
          >
            <Ionicons name="pencil" size={22} color="#f39c12" />
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => confirmDeleteUser(item)}
          >
            <Ionicons name="trash" size={22} color="#e74c3c" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={renderUserItem}
      />
      <DeleteUserModal
        visible={showDeleteModal}
        user={selectedUser!}
        cancelAction={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        deleteAction={() => {
          if (selectedUser) {
            handleDeleteUser(selectedUser);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: "#222",
    fontWeight: "500",
  },
  email: {
    marginTop: 4,
    fontSize: 15,
    color: "#777",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 12,
    padding: 6,
  },
});
