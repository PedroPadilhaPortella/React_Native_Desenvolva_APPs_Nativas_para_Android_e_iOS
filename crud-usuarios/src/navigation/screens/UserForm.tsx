import { StaticScreenProps, useNavigation  } from "@react-navigation/native";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useMemo, useState } from "react";

import { getRandomAvatarColor } from "../../constants/avatarColors";
import { useUsersManager } from "../../context/UsersContext";
import { User } from "../../models/User";

type UserFormProps = StaticScreenProps<{ user?: User }>;

type UserFormData = {
  id?: number;
  name: string;
  email: string;
  color: string;
};

export function UserForm({ route }: UserFormProps) {
  const { addUser, updateUser } = useUsersManager();
  const editingUser = route.params?.user;
  const navigation = useNavigation();

  const [user, setUser] = useState<UserFormData>(
    editingUser ? { ...editingUser, color: editingUser.color } : { name: "", email: "", color: "" },
  );

  const isEditing = !!editingUser;

  useEffect(() => {
    if (!user.color) {
      setUser((currentUser) => ({
        ...currentUser,
        color: editingUser?.color || getRandomAvatarColor(),
      }));
    }
  }, [editingUser?.color, user.color]);

  const avatarColor = useMemo(() => {
    return user.color || editingUser?.color || "#f4511e";
  }, [editingUser?.color, user.color]);

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

  const saveUser = () => {
    if (!user.name.trim() || !user.email.trim()) {
      Alert.alert("Atenção", "Preencha nome e email antes de salvar.");
      return;
    }

    if (isEditing && editingUser) {
      updateUser({
        ...editingUser,
        ...user,
        id: editingUser.id,
        name: user.name.trim(),
        email: user.email.trim(),
        color: user.color || editingUser.color,
      });
    } else {
      addUser({
        name: user.name.trim(),
        email: user.email.trim(),
        color: user.color,
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.avatarPreview, { backgroundColor: avatarColor }]}> 
        <Text style={styles.avatarPreviewText}>{getInitials(user.name || "Usuário")}</Text>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        onChangeText={(name) => setUser({ ...user, name })}
        value={user.name}
        style={styles.input}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        onChangeText={(email) => setUser({ ...user, email })}
        value={user.email}
        style={styles.input}
        placeholder="Digite o email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Pressable style={styles.saveButton} onPress={saveUser}>
        <Text style={styles.saveButtonText}>
          {isEditing ? "Salvar alterações" : "Cadastrar"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  avatarPreview: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: "center",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPreviewText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  input: {
    height: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#f4511e",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
