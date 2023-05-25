import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import UserDetails from "./screens/UserDetails";
import FoodIntake from "./screens/FoodIntake";
import Dashboard from "./screens/Dashboard";
import { Text, View } from "react-native";
import {
  useFonts,
  LexendGiga_400Regular,
} from "@expo-google-fonts/lexend-giga";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    lexend: LexendGiga_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    ); // Render a loading state if fonts are not yet loaded
  } else {
    return (
      <View
        className="flex-1 bg-black"
        style={{
          fontFamily: "lexend",
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="FoodIntake" component={FoodIntake} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
};

export default App;
