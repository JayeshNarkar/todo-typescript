import axios from "axios";
import { atom, selector } from "recoil";

export const backendUrlAtom = atom<string>({
  key: "backendUrl",
  default: "https://todo-backend-typescript.azurewebsites.net",
});

export const usernameAtom = atom<string>({
  key: "username",
  default: "",
});

export const passwordAtom = atom<string>({
  key: "password",
  default: "",
});

export const userIdAtom = atom<number>({
  key: "userId",
  default: -1,
});

const defaultTodos = selector({
  key: "DefaultTodos",
  get: async ({ get }) => {
    const id = localStorage.getItem("userId");
    try {
      const backendUrl = get(backendUrlAtom);
      const response = await axios.get(`${backendUrl}/api/todos/${id}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
});

export const todoListAtom = atom<object[]>({
  key: "todoList",
  default: defaultTodos,
});

const defaultIsAuthenticated = selector({
  key: "DefaultIsAuthenticated",
  get: async ({ get }) => {
    const id = localStorage.getItem("userId");
    try {
      const backendUrl = get(backendUrlAtom);
      await axios.get(`${backendUrl}/api/users/${id}`);
      return true;
    } catch (err) {
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      return false;
    }
  },
});

export const isAuthenticatedAtom = atom({
  key: "isAuthenticated",
  default: defaultIsAuthenticated,
});
