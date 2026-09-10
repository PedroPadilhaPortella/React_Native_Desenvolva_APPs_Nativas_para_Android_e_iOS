import { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import backgroundImage from "../../assets/images/login.jpg";
import { useRouter } from "expo-router";
import { AuthInput } from "@/components/AuthInput";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateToLogin = () => {
    router.push("/login");
  };

  const register = () => {};

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ transform: [{ scale: 1.1 }] }}
    >
      <Text style={styles.text}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Crie sua conta</Text>
        <AuthInput
          icon="person-outline"
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <AuthInput
          icon="mail-outline"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <AuthInput
          icon="lock-closed-outline"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AuthInput
          icon="lock-closed-outline"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonLabel}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={navigateToLogin}>
          <Text style={styles.linkLabel}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Lato",
    fontSize: 70,
    color: "#fff",
    marginBottom: 10,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 24,
    borderRadius: 8,
  },
  subtitle: {
    fontFamily: "Lato",
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    marginTop: 12,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#080",
    marginTop: 12,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonLabel: {
    fontFamily: "Lato",
    fontSize: 16,
    color: "#fff",
  },
  link: {
    marginTop: 12,
    alignItems: "center",
  },
  linkLabel: {
    fontFamily: "Lato",
    fontSize: 16,
    color: "#fff",
    textDecorationLine: "underline",
  },
});
