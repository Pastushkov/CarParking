import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  navigation: StackNavigationProp<any>;
}

export const Map = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Map</Text>
    </View>
  );
};
