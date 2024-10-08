import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const get = (key: string) => {
  if (!key) {
    return undefined;
  }
  const value = storage.getString(key);

  return value;
};

const set = async (key: string, value: any) => {
  if (!key || !value) {
    return undefined;
  }
  storage.set(key, JSON.stringify(value));
};

export default { get, set };
