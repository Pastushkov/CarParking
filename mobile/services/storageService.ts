import storage from "sync-storage";

const initStorage = async () => {
  await storage.init();
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

initStorage();

export default { get, set, remove };
