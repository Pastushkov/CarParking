import { Car } from "../types";
import { api } from "./api";

export namespace ParkingService {
  export const findNearestParking = async (body: any) => {
    const { data } = await api.post("/parking/find-nearest", body);
    return data.payload;
  };
  export const startParking = async (body: any) => {
    const { data } = await api.post("/parking/start", body);
    return data.payload;
  };
  export const endParking = async (body: any) => {
    const { data } = await api.post("/parking/end", body);
    return data.payload;
  };
}
