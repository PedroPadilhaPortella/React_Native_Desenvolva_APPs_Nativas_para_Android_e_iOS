import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { StyleSheet, View, TextInputProps, TextInput } from "react-native";

type AuthInputProps = TextInputProps & {
  icon: ComponentProps<typeof Ionicons>['name']
};

export function AuthInput({ icon, ...props }: AuthInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={20} color="#333" style={styles.icon} />
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
  },
});
