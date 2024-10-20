import React from "react";
import { Button, Text, View } from "react-native";
import { clearUserData } from "../../services/authService";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<any>;
}

export const Profile = ({navigation}: Props) => {
  return (
    <View>
      <Text>Profile</Text>
      <Button title="logout" onPress={()=>{
        clearUserData();
        navigation.navigate('Login')
      }}/>
    </View>
  );
};
