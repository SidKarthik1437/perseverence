// web 1073075886784-cqdn5jnsivrrmqqv26o5au11qs8o3o3f.apps.googleusercontent.com
// android 1073075886784-hp7ihn16l759p2orabh6om01lv9v206e.apps.googleusercontent.com

import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1073075886784-hp7ihn16l759p2orabh6om01lv9v206e.apps.googleusercontent.com",
    webClientId:
      "1073075886784-cqdn5jnsivrrmqqv26o5au11qs8o3o3f.apps.googleusercontent.com",
    expoClientId:
      "1073075886784-n05h2oo8rn5a66p7v05he2a1pl5a913s.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignin();
  }, []);

  console.log("Login");

  async function handleSignin() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
    await checkUserExists()
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <SafeAreaView className="flex flex-1 items-center justify-end w-full h-screen my-2 bg-white">
      <Text className="font-lex text-2xl font-light">Login</Text>
      <Text>Welcome {JSON.stringify(userInfo)}</Text>
      <TouchableOpacity
        className="bg-[#100f10] w-11/12 px-2 h-14 flex justify-self-end items-center justify-center  rounded-xl"
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text
          className="text-white text-xl px-2"
          style={{
            fontFamily: "lexend",
          }}
        >
          Continue With Google
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
