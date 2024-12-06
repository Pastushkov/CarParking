import React, { useEffect, useRef } from "react";
import { clearUserData } from "../../services/authService";
import { StackNavigationProp } from "@react-navigation/stack";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import { useRootState } from "../../state/rootState";
import { TopUpBottomSheet } from "../../components/TopUpBottomSheet";
import { colors } from "../../colors";
import { MenuItem } from "../../components/MenuItem";
interface Props {
  navigation: StackNavigationProp<any>;
}

export const Profile = ({ navigation }: Props) => {
  const { rootState } = useRootState();
  const topUpRef = useRef<BottomSheet>(null);

  const fetchMe = async () => {
    await rootState.fetchMe();
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Balance: {rootState?.client?.balance}</Text>
        <Button
          title="top up balance"
          onPress={() => {
            topUpRef?.current?.expand();
          }}
        />
      </View>
      <TopUpBottomSheet topUpRef={topUpRef} />
      <MenuItem
        name="Cars"
        onPress={() => {
          navigation.navigate("Cars");
        }}
        icon={require("../../assets/icons/cars.png")}
      />
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Button
          title="logout"
          onPress={() => {
            clearUserData();
            navigation.replace("Login");
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
