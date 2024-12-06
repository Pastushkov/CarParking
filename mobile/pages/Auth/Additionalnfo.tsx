import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRootState } from "../../state/rootState";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { Car } from "../../types";

interface Props {
  navigation: StackNavigationProp<any>;
}

interface FormInputs {
  name: string;
  cars: Car[];
}

export const AdditionInfo = ({ navigation }: Props) => {
  const { rootState, setRootState } = useRootState();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormInputs>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      cars: [
        {
          name: "",
          plate: "",
        },
      ],
    },
  });

  const userName = useWatch({
    control,
    name: "name",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cars",
  });

  const submit = async (values: FormInputs) => {
    setLoading(true);
    console.log(rootState);
    
    setRootState((state: any) => ({
      ...state,
      auth: {
        ...state.auth,
        userName: values.name,
        cars: values.cars,
      },
    }));
    navigation.replace("Pin", {
      createPin: true,
    });
    setLoading(false);
  };

  const finishButtonDisabled = loading || !userName;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Enter additional info</Text>
      <Text>Enter your name</Text>

      <Controller
        name="name"
        control={control}
        rules={{
          required: "Name is required",
        }}
        render={({ field }) => (
          <TextInput
            autoFocus
            placeholder="User name"
            style={{
              height: 40,
              borderColor: errors.name ? "red" : "gray",
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
      {errors.name && (
        <Text style={{ color: "red" }}>{errors.name.message}</Text>
      )}

      <View
        style={{
          marginTop: 40,
        }}
      >
        {fields.map((_, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                gap: 15,
                alignItems: "center",
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <Controller
                  name={`cars.${index}.name`}
                  control={control}
                  rules={{
                    required: "Car name required",
                  }}
                  render={({ field }) => (
                    <TextInput
                      id={`cars.${index}.name`}
                      placeholder="Car name"
                      style={{
                        height: 40,
                        borderWidth: 1,
                        width: 150,
                        marginBottom: 10,
                        padding: 5,
                      }}
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                  )}
                />

                <Controller
                  name={`cars.${index}.plate`}
                  control={control}
                  rules={{
                    required: "Car plates required",
                  }}
                  render={({ field }) => (
                    <TextInput
                      id={`cars.${index}.plate`}
                      autoFocus
                      placeholder="plate number"
                      style={{
                        height: 40,
                        borderWidth: 1,
                        width: 150,
                        marginBottom: 10,
                        padding: 5,
                      }}
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                  )}
                />
              </View>
              {index > 0 && (
                <Pressable onPress={() => remove(index)}>
                  <Text>X</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>
      <Button
        title={"Add one more car"}
        onPress={() => append({ name: "", plate: "" })}
      />

      <View
        style={{
          marginTop: 100,
        }}
      >
        <Button
          title={loading ? "Waiting..." : "Next"}
          onPress={handleSubmit(submit)}
          disabled={finishButtonDisabled}
        />
      </View>
    </View>
  );
};
