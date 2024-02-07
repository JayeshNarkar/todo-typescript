import { atom } from "recoil";

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

export const todoListAtom = atom<object[]>({
  key: "todoList",
  default: [],
});
