import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  navigation: StackNavigationProp<any>;
}

interface FormInputs {
  phone: string;
}

export const LoginPage = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onSubmit",
    values: {
      phone: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const submit = (values: FormInputs) => {
    setLoading(true);
    const { phone } = values;
    if (phone) {
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("Home");
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <View>
      <Text>Login</Text>

      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Phone is required",
        }}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder="Phone"
            style={{
              height: 40,
              borderColor: errors.phone ? "red" : "gray",
              borderWidth: 1,
              width: 200,
              marginBottom: 10,
              padding: 5,
            }}
          />
        )}
      />
      {errors.phone && (
        <Text style={{ color: "red" }}>{errors.phone.message}</Text>
      )}

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleSubmit(submit)}
        disabled={loading}
      />
    </View>
  );
};
