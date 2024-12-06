import React, { useEffect } from "react";
import { useRootState } from "../state/rootState";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Car } from "../types";

interface Props {
  selectedCarId: string;
  setSelectedCarId: (id: string) => void;
}

export const CarSelect = ({ selectedCarId, setSelectedCarId }: Props) => {
  const { rootState } = useRootState();

  const cars = rootState.client.cars;

  useEffect(() => {
    if (cars && cars.length > 0 && !selectedCarId) {
      setSelectedCarId(cars[0]._id || "");
    }
  }, [cars, selectedCarId, setSelectedCarId]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a car:</Text>
      <Picker
        selectedValue={selectedCarId}
        onValueChange={(itemValue) => setSelectedCarId(itemValue)}
        style={styles.picker}
      >
        {cars.map((car: Car) => (
          <Picker.Item
            key={car._id}
            label={`${car.name} (${car.plate})`}
            value={car._id}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
