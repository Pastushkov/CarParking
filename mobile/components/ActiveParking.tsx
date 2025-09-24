import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useRootState } from "../state/rootState";
import { ParkingService } from "../services/parkingService";

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

interface Props {
  onEnd: () => void;
}

export const ActiveParking = ({ onEnd }: Props) => {
  const [elapsedTime, setElapsedTime] = useState(0); // У секундах
  const [cost, setCost] = useState(0); // Вартість паркування

  const { rootState } = useRootState();

  useEffect(() => {
    if (!rootState.parkingSession?.startParkingDate) return;

    const startParkingDate = new Date(
      rootState.parkingSession.startParkingDate
    ).getTime();
    const ratePerHour = rootState.parkingSession.tariff.pricePerHour;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedTimeInSeconds = Math.floor((now - startParkingDate) / 1000); // Час у секундах
      setElapsedTime(elapsedTimeInSeconds);

      const elapsedHours = elapsedTimeInSeconds / 3600; // Конвертуємо у години
      setCost(elapsedHours * ratePerHour); // Розрахунок вартості
    }, 1000);

    return () => clearInterval(interval); // Очищення таймера
  }, [rootState.parkingSession?.startParkingDate]);

  const handleIamOnPlace = async () => {
    try {
      await ParkingService.bookOnPlace();
      await rootState.fetchMe();
    } catch (error) {
      console.error("Error book on place", JSON.stringify(error));
    }
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>Time: {formatTime(elapsedTime)}</Text>
          <Text>Cost: ${cost.toFixed(2)}</Text>
        </View>
        <View>
          <Text>{rootState?.parkingSession?.carId?.name}</Text>
          <Text>{rootState?.parkingSession?.carId?.plate}</Text>
        </View>
      </View>

      {rootState.parkingSession.booking &&
        rootState.parkingSession.booking.status === "new" && (
          <View>
            <Button title="I'm on place" onPress={handleIamOnPlace} />
          </View>
        )}

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Button title="End parking" onPress={onEnd} />
      </View>
    </View>
  );
};
