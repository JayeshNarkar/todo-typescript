import { atom } from "recoil";

export const usernameAtom = atom<string>({
  key: "username",
  default: "",
});

export const password = atom<string>({
  key: "password",
  default: "",
});

export const userId = atom<number>({
  key: "userId",
  default: -1,
});

export const todoList = atom<object[]>({
  key: "todoList",
  default: [],
});
