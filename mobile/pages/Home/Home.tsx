import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Map } from "../Map/Map";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "../Profile/Profile";

interface Props {
  navigation: StackNavigationProp<any>;
}

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }: Props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navigationMenu: {
    width: "100%",
    height: 30,
    gap: 10,
    backgroundColor: "#0099da",
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});
