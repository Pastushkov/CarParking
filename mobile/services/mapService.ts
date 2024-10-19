import { api } from "./api";

export namespace MapService {
  export const findNearestParking = async (body: any) => {
    const { data } = await api.post("/parking/find-nearest", body);
    return data.payload;
  };
}
