import { Alert, Platform } from "react-native";

const server =
  Platform.OS === "android" ? "http://10.0.2.9:3000" : "http://localhost:3000";

const showError = (error) => {
  if (Platform.OS === "web")
    return alert("Um erro inesperado ocorreu: " + error.message);
  Alert.alert("Um erro inesperado ocorreu", error.message);
};

const showSuccess = (message) => {
  if (Platform.OS === "web") return alert("Sucesso: " + message);
  Alert.alert("Sucesso", message);
};

export { server, showError, showSuccess };
