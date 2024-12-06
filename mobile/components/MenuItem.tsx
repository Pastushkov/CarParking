import React from "react";
import { Image, ImageSourcePropType, Pressable, Text } from "react-native";
import { colors } from "../colors";
interface Props {
  onPress: () => void;
  name: string;
  icon?: ImageSourcePropType;
}

export const MenuItem = ({ onPress, name, icon }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginTop: 20,
        borderWidth: 2,
        padding: 5,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {icon && (
        <Image
          style={{
            width: 35,
            height: 35,
          }}
          source={icon}
        />
      )}
      <Text
        style={{
          fontSize: 26,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};
