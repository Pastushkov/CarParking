import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import {
  AuthenticationState,
  authenticate,
  register,
} from "../../services/authService";
import { useRootState } from "../../state/rootState";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  navigation: StackNavigationProp<any>;
  route: any;
}

interface FormInputs {
  pin: string;
}

export const Pin = ({ navigation, route }: Props) => {
  const { rootState } = useRootState();

  const { createPin } = route?.params || {};
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    mode: "onSubmit",
    defaultValues: {
      pin: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const submit = async (values: FormInputs) => {
    setLoading(true);
    if (createPin) {
      const success = await register({
        ...values,
        phone: rootState.phone,
      });
      if (success) {
        reset({
          pin: "",
        });
        navigation.navigate("Pin", { createPin: false });
      }
    } else {
      const res = await authenticate({
        ...values,
        phone: rootState.phone,
      });
      switch (res) {
        case AuthenticationState.Authenticated:
          navigation.replace("Home");
          return;
      }
    }

    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{createPin ? "Create pin" : "Enter pin"}</Text>
      <Controller
        name="pin"
        control={control}
        rules={{
          required: "pin is required",
        }}
        render={({ field }) => (
          <TextInput
            autoFocus
            placeholder="Code"
            style={{
              height: 40,
              borderColor: errors.pin ? "red" : "gray",
              borderWidth: 1,
              width: 200,
              marginBottom: 10,
              padding: 5,
            }}
            value={field.value}
            onChangeText={field.onChange}
            maxLength={4}
            // type="password"
          />
        )}
      />
      {errors.pin && <Text style={{ color: "red" }}>{errors.pin.message}</Text>}

      <Button
        title={loading ? "Waiting..." : "Verify"}
        onPress={handleSubmit(submit)}
        disabled={loading}
      />
    </View>
  );
};
