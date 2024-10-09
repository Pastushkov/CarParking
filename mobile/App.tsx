import { NavigationContainer } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomeScreen } from "./pages/HomePage/HomePage";
import storageService from "./services/storageService";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false,  }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
