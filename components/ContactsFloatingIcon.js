import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import Context from "../context/Context";
import { useNavigation } from "@react-navigation/native";

function ContactsFloatingIcon() {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("contacts")}
      style={[styles.buttons, { backgroundColor: colors.secondary }]}
    >
      <MaterialCommunityIcons
        name="android-messages"
        size={30}
        color="white"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </Pressable>
  );
}

export default ContactsFloatingIcon;

const styles = StyleSheet.create({
  buttons: {
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 60,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
