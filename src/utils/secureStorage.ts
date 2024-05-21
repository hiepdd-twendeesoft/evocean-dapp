import { Strorages } from "@/models/storage.enum";

//Local Strorage
const setItem = (name: Strorages, value: string) => {
  return localStorage.setItem(name, value);
};

const getItem = (name: Strorages) => {
  return localStorage.getItem(name);
};

const removeItem = (name: Strorages) => {
  return localStorage.removeItem(name);
};

const secureStorage = {
  setItem,
  getItem,
  removeItem,
};

export default secureStorage;
