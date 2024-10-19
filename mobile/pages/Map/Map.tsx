import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { Button, PermissionsAndroid, Platform, Text, View } from "react-native";
import { MapService } from "../../services/mapService";
import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";

interface Props {
  navigation: StackNavigationProp<any>;
}

export const Map = ({ navigation }: Props) => {
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  // const requestLocationPermission = async () => {
  //   if (Platform.OS === "android") {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //       );
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log("Доступ до локації відхилений");
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  // };

  // const find = async () => {
  //   console.log(Geolocation);
  //   console.log(Geolocation.getCurrentPosition);

  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position);
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 150000,
  //       maximumAge: 10000,
  //     }
  //   );

  //   // const res = await MapService.findNearestParking({});
  // };

  const timeoutLocationId = useRef<any>(null);

  const [location, setLocation] = useState<any>(null);

  const getLocation = async () => {
    if (Platform.OS === "android") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("error");

        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);
    }
  };

  useEffect(() => {
    if (!location) {
      timeoutLocationId.current = setInterval(() => {
        console.log("call");

        getLocation();
      }, 10000);
    } else {
      clearInterval(timeoutLocationId.current);
    }

    return () => {
      clearInterval(timeoutLocationId.current);
    };
  }, [location]);

  const find = () => {
    console.log(location);
  };

  return (
    <View>
      <Text>Map</Text>
      <Button title="search" onPress={find} />
    </View>
  );
};
