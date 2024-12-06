import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Map } from "../Map/Map";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "../Profile/Profile";
import { Loader } from "../../components/Loader";
import { useRootState } from "../../state/rootState";
import { clearUserData } from "../../services/authService";
import { Cars } from "../Cars/Cars";

interface Props {
  navigation: StackNavigationProp<any>;
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ size }) => (
            <Image
              style={{
                width: size,
                height: size,
              }}
              source={require("../../assets/icons/map.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size }) => (
            <Image
              style={{
                width: size,
                height: size,
              }}
              source={require("../../assets/icons/profile.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Home = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const { rootState } = useRootState();
  const fetchClient = async () => {
    try {
      await rootState.fetchMe();
    } catch (error) {
      console.log(error);
      clearUserData();
      navigation.replace("Login");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchClient();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cars" component={Cars} />
    </Stack.Navigator>
  );
};
