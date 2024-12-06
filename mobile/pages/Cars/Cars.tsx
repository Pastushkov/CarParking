import { StackNavigationProp } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRootState } from "../../state/rootState";
import { Car } from "../../types";
import { CarService } from "../../services/carService";
import { colors } from "../../colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { Controller, useForm } from "react-hook-form";

interface Props {
  navigation: StackNavigationProp<any>;
}

interface FormValues {
  name: string;
  plate: string;
}

export const Cars = ({ navigation }: Props) => {
  const { rootState } = useRootState();
  const [loading, setLoading] = useState(false);
  const [isAddCar, setIsAddCar] = useState(false);

  const handleDeleteCar = async (id: string) => {
    try {
      await CarService.deleteCar(id);
      await rootState.fetchMe();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      plate: "",
    },
  });

  const submit = async (values: FormValues) => {
    setLoading(true);
    try {
      await CarService.createCar(values);
      setIsAddCar(false);
      await rootState.fetchMe();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
      }}
    >
      {rootState?.client?.cars?.map(({ name, plate, _id }: Car) => {
        return (
          <View
            key={_id}
            style={{
              gap: 10,
              backgroundColor: colors.white,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {name}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {plate}
              </Text>
            </View>
            <Pressable onPress={() => handleDeleteCar(_id!)}>
              <Text>delete</Text>
            </Pressable>
          </View>
        );
      })}

      {isAddCar ? (
        <View
          style={{
            padding: 20,
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
            }}
            render={({ field }) => (
              <TextInput
                id="name"
                placeholder="name"
                style={{
                  height: 40,
                  borderColor: errors.name ? "red" : "gray",
                  borderWidth: 1,
                  marginBottom: 10,
                  padding: 5,
                }}
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <Controller
            name="plate"
            control={control}
            rules={{
              required: "plate is required",
            }}
            render={({ field }) => (
              <TextInput
                id="plate"
                placeholder="plate"
                style={{
                  height: 40,
                  borderColor: errors.plate ? "red" : "gray",
                  borderWidth: 1,
                  marginBottom: 10,
                  padding: 5,
                }}
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <View
            style={{
              gap: 10,
            }}
          >
            <Button
              disabled={loading}
              title="Add"
              onPress={handleSubmit(submit)}
            />
            <Button
              title="Cancel"
              onPress={() => {
                setIsAddCar(false);
                reset();
              }}
            />
          </View>
        </View>
      ) : (
        <View>
          <Button
            title="Add car"
            onPress={() => {
              setIsAddCar(true);
            }}
          />
        </View>
      )}
    </View>
  );
};
