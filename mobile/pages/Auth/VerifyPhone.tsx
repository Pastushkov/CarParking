import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import { verifySms } from "../../services/authService";
import { useRootState } from "../../state/rootState";

interface Props {
  navigation: StackNavigationProp<any>;
}

interface FormInputs {
  code: string;
}

export const VerifyPhone = ({ navigation }: Props) => {
  const { rootState } = useRootState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onSubmit",
    defaultValues: {
      code: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const submit = async (values: FormInputs) => {
    setLoading(true);
    const res = await verifySms({ ...values, ...rootState.auth });
    if (res) {
      navigation.replace("AdditionalInfo");
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
      <Text>Veryfy Phone</Text>
      <Text>Enter code from sms</Text>

      <Controller
        name="code"
        control={control}
        rules={{
          required: "Code is required",
        }}
        render={({ field }) => (
          <TextInput
            keyboardType="number-pad"
            autoFocus
            placeholder="Code"
            style={{
              height: 40,
              borderColor: errors.code ? "red" : "gray",
              borderWidth: 1,
              width: 200,
              marginBottom: 10,
              padding: 5,
            }}
            value={field.value}
            maxLength={6}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.code && (
        <Text style={{ color: "red" }}>{errors.code.message}</Text>
      )}

      <Button
        title={loading ? "Waiting..." : "Verify"}
        onPress={handleSubmit(submit)}
        disabled={loading}
      />
    </View>
  );
};
