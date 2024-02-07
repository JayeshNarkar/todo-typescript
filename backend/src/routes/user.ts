import express from "express";

import * as bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userRoute = express.Router();

const saltRounds = 10;

userRoute.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

userRoute.post("/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    bcrypt.genSalt(saltRounds, async (err, salt) => {
      if (err) {
        throw err;
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          throw err;
        }
        const user = await prisma.user.create({
          data: {
            username,
            password: hash,
          },
        });
        res.json(user);
      });
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

userRoute.delete("/users", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await prisma.user.delete({
      where: {
        username,
      },
    });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

userRoute.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default userRoute;
