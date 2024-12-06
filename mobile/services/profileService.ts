import { api } from "./api";

export namespace ProfileService {
  export const fetchMe = async () => {
    const { data } = await api.get("client/me");
    return data.payload;
  };
  export const topUpBalance = async (body: any) => {
    const { data } = await api.post("/client/topUp", body);
    return data;
  };
}
