import { useAssets } from "expo-asset";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, LogBox } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import SignIn from "./screens/SignIn";
import ContextWrapper from "./context/ContextWrapper";
import Profile from "./screens/Profile";
import Context from "./context/Context";
import Photos from "./screens/Photos";
import Chats from "./screens/Chats";
import Contacts from "./screens/Contacts";
import ChatHeader from "./components/ChatHeader";
import Chat from "./screens/Chat";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  "@firebase/firestore:, Firestore (9.10.0): Connection, WebChannel transport errored: [object Object]",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const [curUser, setCurUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {!curUser ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!curUser.displayName && (
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="home"
            component={Home}
            options={{ title: "Let's Chat" }}
          />
          <Stack.Screen
            name="contacts"
            component={Contacts}
            options={{ title: "Select Contacts" }}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{ headerTitle: (props) => <ChatHeader {...props} /> }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function Home() {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="camera" size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.foreground,
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="photo" component={Photos} />
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
  );
  if (!assets) {
    return <Text>Loading</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

export default Main;
