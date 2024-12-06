import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Login } from "./pages/Auth/Login";
import { Home } from "./pages/Home/Home";
import { VerifyPhone } from "./pages/Auth/VerifyPhone";
import { RootStateProvier } from "./state/rootState";
import { Pin } from "./pages/Auth/Pin";
import { AdditionInfo } from "./pages/Auth/Additionalnfo";

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
          <Stack.Screen name="AdditionalInfo" component={AdditionInfo} />
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
