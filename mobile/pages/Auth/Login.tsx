import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import storageService from "../../services/storageService";
import { findUser } from "../../services/authService";
import { useRootState } from "../../state/rootState";

interface Props {
  navigation: StackNavigationProp<any>;
}

interface FormInputs {
  phone: string;
}

export const Login = ({ navigation }: Props) => {
  const { setRootState } = useRootState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onSubmit",
    defaultValues: {
      phone: "380634365682", //TODO remove
    },
  });

  useEffect(() => {
    const token = storageService.get("token");
    if (token) {
      navigation.replace("Home");
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const submit = async (values: FormInputs) => {
    setLoading(true);
    setRootState((state: any) => ({
      ...state,
      phone: values.phone,
    }));
    const res = await findUser(values);
    if (res.processLogin) {
      navigation.navigate("Pin", { createPin: false });
    } else {
      navigation.navigate("VerifyPhone");
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
        rules={{
          required: "Phone is required",
        }}
        render={({ field }) => (
          <TextInput
            autoFocus
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
