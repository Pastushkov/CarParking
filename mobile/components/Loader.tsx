import React from "react";
import { Text, View } from "react-native";

export const Loader = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Loading</Text>
    </View>
  );
};
