import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import storageService from "../../services/storageService";
import { api } from "../../services/api";

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
    defaultValues: {
      phone: "",
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = storageService.get("token");
    if (token) {
      navigation.navigate("Home");
    }
  }, []);

  const submit = (values: FormInputs) => {
    setLoading(true);
    const { phone } = values;
    if (phone) {
      api.get('/')
      setTimeout(() => {
        setLoading(false);
        navigation.replace("Home");
      }, 3000);
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
      <Text>Login</Text>

      <Controller
        name="phone"
        control={control}
        // rules={{
        //   required: "Phone is required",
        // }}
        render={({ field }) => (
          <TextInput
            // {...field}
            placeholder="Phone"
            style={{
              height: 40,
              borderColor: errors.phone ? "red" : "gray",
              borderWidth: 1,
              width: 200,
              marginBottom: 10,
              padding: 5,
            }}
            value={field.value}
            onChangeText={field.onChange}
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
