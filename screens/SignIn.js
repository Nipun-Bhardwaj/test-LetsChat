import { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import Context from "../context/Context";
import { signIn, signUp } from "../Firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");
  const {
    theme: { colors },
  } = useContext(Context);

  async function pressHandler() {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }

  function forEmail(text) {
    setEmail(text);
  }

  function forPassword(text) {
    setPassword(text);
  }

  return (
    <View style={[styles.rootContainer, { backgroundColor: colors.white }]}>
      <Text style={[styles.textStyle, { color: colors.foreground }]}>
        Welcome to Let's Chat
      </Text>
      <Image
        source={require("../assets/welcome-img.png")}
        style={styles.imgStyle}
      />
      <View style={{ marginTop: 20 }}>
        <TextInput
          value={email}
          onChangeText={forEmail}
          placeholder="Email"
          style={[styles.textInputStyle, { borderBottomColor: colors.primary }]}
        />
        <TextInput
          value={password}
          onChangeText={forPassword}
          placeholder="Password"
          secureTextEntry={true}
          style={[
            styles.textInputStyle,
            { borderBottomColor: colors.primary, marginTop: 20 },
          ]}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title={mode === "signUp" ? "Sign Up" : "Login"}
          disabled={!password || !email}
          color={colors.secondary}
          onPress={pressHandler}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={() =>
          mode === "signUp" ? setMode("signIn") : setMode("signUp")
        }
      >
        <Text style={{ color: colors.secondaryText }}>
          {mode === "signUp"
            ? "Already Have an account Sign In"
            : "Don't Have an account Sign Up"}
        </Text>
      </Pressable>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textStyle: {
    fontSize: 24,
    marginBottom: 20,
  },
  imgStyle: {
    width: 180,
    height: 180,
    resizeMode: "cover",
  },
  textInputStyle: {
    borderBottomWidth: 2,
    width: 200,
  },
  button: {
    marginTop: 15,
  },
});
