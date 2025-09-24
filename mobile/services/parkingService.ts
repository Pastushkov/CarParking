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
  export const bookPlace = async (body: any) => {
    const { data } = await api.post("/parking/book", body);
    return data.payload;
  };
  export const getBooking = async () => {
    const { data } = await api.get("/parking/book");
    return data.payload;
  };
  export const bookOnPlace = async () => {
    const { data } = await api.get("/parking/book/onplace");
    return data.payload;
  };
}
