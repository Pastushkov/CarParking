import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, Linking, Platform, Text, View } from "react-native";
import { ParkingService } from "../../services/parkingService";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { ParkingSpots } from "../../types";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import RouteIcon from "./route.svg";
import {
  isUserWithinRadius,
  requestLocationPermission,
} from "../../services/mapUtils";
import { CarSelect } from "../../components/CarSelect";
import { useRootState } from "../../state/rootState";
import { ActiveParking } from "../../components/ActiveParking";

interface Props {
  navigation: StackNavigationProp<any>;
}

export const Map = ({ navigation }: Props) => {
  const { rootState } = useRootState();

  const [currentLocation, setCurrentLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpots[]>([]);
  const [spotDetail, setSpotDetail] = useState<{
    isOpen: boolean;
    text: string;
    position: {
      latitude?: number;
      longitude?: number;
    };
    isAbleToPark: boolean;
    _id: string;
  }>({
    isOpen: false,
    text: "",
    position: {},
    isAbleToPark: false,
    _id: "",
  });
  const [selectedCarId, setSelectedCarId] = useState(
    rootState?.client?.cars?.[0] ?? ""
  );

  const mapRef = useRef<MapView>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const fetchParkingSpots = async () => {
    try {
      const spots = await ParkingService.findNearestParking({
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
    const init = async () => {
      if (!currentLocation) {
        await getCurrentPosition();
      } else {
        await fetchParkingSpots();
      }
    };
    init();
  }, [currentLocation, rootState.parkingSession]);

  if (!currentLocation) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleBuildRouteWithinGoogleMap = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation?.latitude},${currentLocation.longitude}&destination=${spotDetail.position?.latitude},${spotDetail.position?.longitude}&travelmode=driving`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Unable open Google Maps");
    });
  };

  const isParkingActive = !!rootState.parkingSession;

  const handleStartParking = async () => {
    try {
      await ParkingService.startParking({
        parkingId: spotDetail._id,
        carId: selectedCarId,
      });
      await rootState.fetchMe();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const handleEndParking = async () => {
    try {
      await ParkingService.endParking({
        carId: rootState.parkingSession.carId._id,
      });
      await rootState.fetchMe();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const handleBookPlace = async () => {
    console.log(spotDetail);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        onMapReady={() => {
          console.log("Map is ready!");
        }}
        onMapLoaded={() => {
          console.log("Map loaded successfully!");
        }}
        ref={mapRef}
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
            position: {},
            isAbleToPark: false,
            _id: "",
          });
        }}
        toolbarEnabled={false}
      >
        {parkingSpots?.map(({ name, position, _id }, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: position.lat,
              longitude: position.lon,
            }}
            pinColor={
              _id === rootState?.parkingSession?.parkingId?._id ? "blue" : "red"
            }
            title={name}
            description={`Місць: 1, Вільних: 1, Години роботи: 1-1`}
            onPress={() => {
              if (isParkingActive) {
                mapRef.current?.animateToRegion(
                  {
                    latitude:
                      rootState?.parkingSession?.parkingId?.position
                        ?.coordinates?.[0],
                    longitude:
                      rootState?.parkingSession?.parkingId?.position
                        ?.coordinates?.[1],
                    latitudeDelta: 0.01, // Визначаємо рівень масштабування
                    longitudeDelta: 0.01,
                  },
                  500
                );
              }
              setSpotDetail({
                isOpen: true,
                text: "some text with info here",
                position: {
                  latitude: position.lat,
                  longitude: position.lon,
                },
                isAbleToPark: isUserWithinRadius(currentLocation, {
                  latitude: position.lat,
                  longitude: position.lon,
                }),
                _id,
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
        <BottomSheetView>
          {isParkingActive ? (
            <ActiveParking onEnd={handleEndParking} />
          ) : (
            <View
              style={{
                padding: 20,
              }}
            >
              <Button title="Book place" onPress={() => handleBookPlace()} />
              <Button
                title="Park"
                disabled={!spotDetail.isAbleToPark}
                onPress={() => handleStartParking()}
              />
              {!spotDetail.isAbleToPark ? (
                <View
                  style={{
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    You are too far from the parking. Tap the icon below to get
                    directions to the parking.
                  </Text>
                  <RouteIcon
                    width={40}
                    height={40}
                    onPress={handleBuildRouteWithinGoogleMap}
                    style={{
                      alignSelf: "center",
                      marginVertical: 10,
                    }}
                  />
                </View>
              ) : (
                <View>
                  <CarSelect
                    selectedCarId={selectedCarId}
                    setSelectedCarId={setSelectedCarId}
                  />
                </View>
              )}
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
