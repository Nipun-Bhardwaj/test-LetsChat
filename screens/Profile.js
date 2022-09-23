import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Context from "../context/Context";
import { TextInput } from "react-native-gesture-handler";
import { pickImage, askForPermission, uploadImage } from "../Utils";
import { auth, db } from "../Firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";

function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    theme: { colors },
  } = useContext(Context);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }

    // console.log({ ...userData, uid: user.uid }  );
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);

    navigation.navigate("home");
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (!permissionStatus) {
    return <Text>Loading....</Text>;
  }

  if (permissionStatus !== "granted") {
    return <Text>You Need to allow this permission</Text>;
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.rootContainer}>
        <Text style={[styles.textContainer, { color: colors.foreground }]}>
          Profile Info
        </Text>
        <Text style={[styles.provideContainer, { color: colors.text }]}>
          Please provide your name and optional profile photo
        </Text>
        <View style={{ overflow: "hidden" }}>
          <Pressable
            style={[
              styles.addPhoto,
              { backgroundColor: colors.background },
              ({ pressed }) => pressed && styles.pressed,
            ]}
            android_ripple={{ color: "#ccc" }}
            onPress={handleProfilePicture}
          >
            {!selectedImage ? (
              <MaterialCommunityIcons
                name="camera-plus"
                color={colors.iconGray}
                size={45}
              />
            ) : (
              <Image source={{ uri: selectedImage }} style={styles.imagePick} />
            )}
          </Pressable>
        </View>
        <TextInput
          placeholder="Type your Name"
          value={displayName}
          onChangeText={setDisplayName}
          style={[
            styles.textInputContainer,
            { borderBottomColor: colors.primary },
          ]}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            color={colors.secondary}
            onPress={handlePress}
            disabled={!displayName}
          />
        </View>
      </View>
    </>
  );
}

export default Profile;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    padding: 20,
  },
  textContainer: {
    fontSize: 22,
  },

  provideContainer: {
    fontSize: 14,
    marginTop: 20,
  },
  addPhoto: {
    marginTop: 20,
    borderRadius: 120,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  imagePick: {
    height: "100%",
    width: "100%",
    borderRadius: 120,
  },
  buttonContainer: {
    marginTop: "auto",
    width: 80,
  },
  textInputContainer: {
    marginTop: 40,
    borderBottomWidth: 2,
    width: "100%",
  },
});
