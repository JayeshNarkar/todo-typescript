import axios from "axios";
import { atom, selector } from "recoil";

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
  get: async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await axios.get(`http://localhost:3000/api/todos`, {
        userId: id,
      });
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
  get: async () => {
    const id = localStorage.getItem("userId");
    try {
      await axios.get(`http://localhost:3000/api/users/${id}`);
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
