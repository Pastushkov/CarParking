import storage from "sync-storage";

export const initStorageService = async () => {
  return await storage.init();
};

const get = (key: string) => {
  if (!key) {
    return null;
  }

  const value = storage.get(key);
  return value;
};

const set = (key: string, value: any) => {
  if (!key || !value) {
    return undefined;
  }
  storage.set(key, JSON.stringify(value));
};

const remove = (key: string) => {
  if (!key) {
    return undefined;
  }
  storage.remove(key);
};

export default { get, set, remove };
