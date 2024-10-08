import storage from "./storageService";

export const getToken = () => {
  const token = storage.get("token");

  return token;
};

export const setToken = (token: string) => {
  storage.set("token", token);
};
