import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import Index from "./screens/Index";
import Article from "./screens/Article";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Gadget from "./screens/Gadget";
import Albo from "./screens/Albo";
import Regolamento from "./screens/Regolamento";
import Privacy from "./screens/Privacy";
import Contatti from "./screens/Contatti";
import ThankYou from "./screens/ThankYou";
import ResetPassword from "./screens/ResetPassword";
import FacebookEvents from "./screens/FacebookEvents";
import Navigator from "./screens/Navigator";
import ModifyProfile from "./screens/ModifyProfile";

const Stack = createStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000); // Simula il caricamento delle risorse
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <Image source={require("./assets/splash-icon.png")} style={{ width: 200, height: 200 }} />
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "black" },
        }}
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Article" component={Article} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Gadget" component={Gadget} />
        <Stack.Screen name="Albo" component={Albo} />
        <Stack.Screen name="Regolamento" component={Regolamento} />
        <Stack.Screen name="Contatti" component={Contatti} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="ThankYou" component={ThankYou} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="FacebookEvents" component={FacebookEvents} />
        <Stack.Screen name="Navigator" component={Navigator} />
        <Stack.Screen name="ModifyProfile" component={ModifyProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}