import { NavigationContainer } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Login } from "./pages/Auth/Login";
import { Home } from "./pages/Home/Home";
import storageService from "./services/storageService";
import { VerifyPhone } from "./pages/Auth/VerifyPhone";
import { RootStateProvier } from "./state/rootState";
import { Pin } from "./pages/Auth/Pin";

const Stack = createStackNavigator();

export default function App() {
  return (
    <RootStateProvier>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
          <Stack.Screen name="Pin" component={Pin} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RootStateProvier>
  );
}
