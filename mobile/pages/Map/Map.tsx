import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { Button, PermissionsAndroid, Platform, Text, View } from "react-native";
import { MapService } from "../../services/mapService";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { ParkingSpots } from "../../types";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

interface Props {
  navigation: StackNavigationProp<any>;
}

export const Map = ({ navigation }: Props) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpots[]>([]);
  const [spotDetail, setSpotDetail] = useState<{
    isOpen: boolean;
    text: string;
  }>({
    isOpen: false,
    text: "",
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Доступ до локації відхилений");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const fetchParkingSpots = async () => {
    try {
      const spots = await MapService.findNearestParking({
        longitude: currentLocation?.longitude,
        latitude: currentLocation?.latitude,
      });
      setParkingSpots(spots);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentPosition = async () => {
    if (Platform.OS === "android") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("error");

        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentLocation({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });
    }
  };

  useEffect(() => {
    if (currentLocation) {
      fetchParkingSpots();
    } else {
      getCurrentPosition();
    }
  }, [currentLocation]);

  if (!currentLocation) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        onPress={() => {
          bottomSheetRef.current?.close();
          setSpotDetail({
            isOpen: false,
            text: "",
          });
        }}
      >
        {parkingSpots?.map(({ name, position }, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: position.lat,
              longitude: position.lon,
            }}
            title={name}
            description={`Місць: 1, Вільних: 1, Години роботи: 1-1`}
            onPress={() => {
              setSpotDetail({
                isOpen: true,
                text: "some text with info here",
              });
              bottomSheetRef.current?.expand();
            }}
          />
        ))}
      </MapView>
      <Button title="test" onPress={() => {}} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["25%", "50%"]}
        enablePanDownToClose={true}
      >
        <BottomSheetView
          style={{
            padding: 20,
          }}
        >
          <Text>{spotDetail.text}</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
