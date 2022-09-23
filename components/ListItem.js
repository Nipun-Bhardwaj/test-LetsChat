import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Context from "../context/Context";
import { Grid, Row, Col } from "react-native-easy-grid";
import Avatar from "./Avatar";

function ListItem({ type, description, user, style, time, room, image }) {
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Pressable
      style={{ height: 80, ...style }}
      onPress={() => navigation.navigate("chat", { user, room, image })}
    >
      <Grid style={styles.buttons}>
        <Col style={styles.colGrid}>
          <Avatar user={user} size={type === "contacts" ? 40 : 65} />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Row style={{ alignItems: "center" }}>
            <Col>
              <Text style={[styles.contact, { color: colors.text }]}>
                {user.contactName || user.displayName}
              </Text>
            </Col>
            {time && (
              <Col style={styles.timeCol}>
                <Text style={{ color: colors.secondaryText, fontSize: 11 }}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={{ color: colors.secondaryText, fontSize: 13 }}>
                {description}
              </Text>
            </Row>
          )}
        </Col>
      </Grid>
    </Pressable>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  buttons: {
    maxHeight: 80,
  },
  colGrid: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  contact: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timeCol: {
    alignItems: "flex-end",
  },
});
