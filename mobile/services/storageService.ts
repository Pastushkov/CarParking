import storage from "sync-storage";

const initStorage = async () => {
  const data = await storage.init();
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

initStorage();

export default { get, set };
