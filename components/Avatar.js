import { Image, StyleSheet } from "react-native";

function Avatar({ size, user }) {
  return (
    <Image
      style={{ width: size, height: size, borderRadius: size }}
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require("../assets/icon-square.png")
      }
      resizeMode="cover"
    />
  );
}

export default Avatar;

const styles = StyleSheet.create({});
