import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Context from "../context/Context";
import Avatar from "./Avatar";

function ChatHeader() {
  const route = useRoute();
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <Avatar size={40} user={route.params.user} />
      </View>
      <View style={styles.nameCall}>
        <Text style={{ color: colors.white, fontSize: 18 }}>
          {route.params.user.contactName || route.params.user.displayName}
        </Text>
      </View>
    </View>
  );
}

export default ChatHeader;

const styles = StyleSheet.create({
  nameCall: {
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
