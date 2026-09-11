import { useRouter } from "expo-router";
import { useReducer } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import { server, showError, showSuccess } from "@/lib/common";
import backgroundImage from "../../assets/images/login.jpg";
import { AuthInput } from "@/components/AuthInput";

type State = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nameError: string | null;
  emailError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
};

type Action =
| { type: "SET_NAME"; payload: string }
| { type: "SET_EMAIL"; payload: string }
| { type: "SET_PASSWORD"; payload: string }
| { type: "SET_CONFIRM_PASSWORD"; payload: string };

const initialState: State = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  nameError: null,
  emailError: null,
  passwordError: null,
  confirmPasswordError: null,
};

function validateName(name: string): string | null {
  return name && name.trim().length >= 3 ? null : "Nome inválido";
}

function validateEmail(email: string): string | null {
  return email && email.includes("@") ? null : "E-mail inválido";
}

function validatePassword(password: string): string | null {
  return password && password.length >= 6 ? null : "Senha inválida";
}

function validateConfirmPassword(confirmPassword: string, password: string): string | null {
  return confirmPassword && confirmPassword === password ? null : "As senhas não coincidem";
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
        nameError: validateName(action.payload),
      };
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
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
        confirmPasswordError: validateConfirmPassword(action.payload, state.password),
      };
    default:
      return state;
  }
}

export default function Register() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const isFormValid =
    !state.nameError &&
    !state.emailError &&
    !state.passwordError &&
    !state.confirmPasswordError &&
    state.name &&
    state.email &&
    state.password &&
    state.confirmPassword;

  const navigateToLogin = () => {
    router.push("/login");
  };

  const register = async() => {
    if (!isFormValid) return;
    try {
      await axios.post(`${server}/signup`, { 
        name: state.name,
        email: state.email,
        password: state.password
      });
      showSuccess("Cadastro realizado com sucesso!");
      router.push("/login");
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
      <Text style={styles.text}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Crie sua conta</Text>

        <AuthInput
          icon="person-outline"
          placeholder="Nome"
          value={state.name}
          onChangeText={(text) => dispatch({ type: "SET_NAME", payload: text })}
        />
        {state.nameError && <Text style={styles.error}>{state.nameError}</Text>}

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

        <AuthInput
          icon="lock-closed-outline"
          placeholder="Confirmar Senha"
          value={state.confirmPassword}
          onChangeText={(text) => dispatch({ type: "SET_CONFIRM_PASSWORD", payload: text })}
          secureTextEntry
        />
        {state.confirmPasswordError && <Text style={styles.error}>{state.confirmPasswordError}</Text>}

        <TouchableOpacity 
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={register} disabled={!isFormValid}
        >
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
  error: {
    color: "#f66",
    fontSize: 12,
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
