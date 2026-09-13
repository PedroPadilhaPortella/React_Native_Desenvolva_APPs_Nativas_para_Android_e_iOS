import { useReducer } from "react";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import backgroundImage from "../../assets/images/login.jpg";
import { AuthInput } from "@/components/AuthInput";
import { server, showError } from "@/lib/common";
import { useAuth } from "@/context/AuthContext";

type State = {
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
};

type Action = | { type: "SET_EMAIL"; payload: string } | { type: "SET_PASSWORD"; payload: string };

const initialState: State = {
  email: "pedro@nortelli.com",
  password: "pedro123",
  emailError: null,
  passwordError: null,
};

function validateEmail(email: string): string | null {
  return email && email.includes("@") ? null : "E-mail inválido";
}

function validatePassword(password: string): string | null {
  return password && password.length >= 6 ? null : "Senha inválida";
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
        emailError: validateEmail(action.payload),
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        passwordError: validatePassword(action.payload),
      };
    default:
      return state;
  }
}

export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signIn } = useAuth();
  const router = useRouter();
  
  const isFormValid = !state.emailError && !state.passwordError && state.email && state.password;

  const navigateToRegister = () => {
    router.push("/register");
  };

  const login = async () => {
    if (!isFormValid) return;
  
    try {
      const response = await axios.post(`${server}/signin`, { email: state.email, password: state.password });
      
      const { name, email, token } = response.data;
      signIn({ name, email }, token);
      router.push("/today");
      
    } catch (error) {
      showError(error);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ transform: [{ scale: 1.1 }] }}
    >
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Faça login na sua conta</Text>

        <AuthInput
          icon="mail-outline"
          placeholder="E-mail"
          value={state.email}
          onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
        />
        {state.emailError && <Text style={styles.error}>{state.emailError}</Text>}

        <AuthInput
          icon="lock-closed-outline"
          placeholder="Senha"
          value={state.password}
          onChangeText={(text) => dispatch({ type: "SET_PASSWORD", payload: text })}
          secureTextEntry
        />
        {state.passwordError && <Text style={styles.error}>{state.passwordError}</Text>}

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={login} disabled={!isFormValid}
        >
          <Text style={styles.buttonLabel}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={navigateToRegister}>
          <Text style={styles.linkLabel}>Não tenho uma conta</Text>
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
  title: {
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
  error: {
    color: "#f66",
    fontSize: 12,
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
