import { PermissionsAndroid, Platform } from "react-native";

export const isUserWithinRadius = (
  userCoords: { latitude?: number; longitude?: number },
  pointCoords: { latitude?: number; longitude?: number },
  radius = 1
): boolean => {
  if (
    !userCoords.latitude ||
    !userCoords.longitude ||
    !pointCoords.latitude ||
    !pointCoords.longitude
  ) {
    return false;
  }

  const R = 6371; // Радіус Землі в кілометрах
  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(pointCoords.latitude - userCoords.latitude);
  const dLon = toRad(pointCoords.longitude - userCoords.longitude);

  const lat1 = toRad(userCoords.latitude);
  const lat2 = toRad(pointCoords.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // відстань у км

  return distance <= radius;
};

export const requestLocationPermission = async () => {
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
