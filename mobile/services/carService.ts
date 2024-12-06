import { Car } from "../types";
import { api } from "./api";

export namespace CarService {
  export const deleteCar = async (id: string) => {
    const { data } = await api.delete(`/cars/${id}`);
    return data.payload;
  };
  export const createCar = async (body: Car) => {
    const { data } = await api.post("/cars", body);
    return data.payload;
  };
}
