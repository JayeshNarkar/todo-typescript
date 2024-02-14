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
    const existingUser = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
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
        res.json({
          id: user.id,
          username: user.username,
          message: "User created",
        });
      });
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

userRoute.delete("/users", async (req, res) => {
  const { username } = req.body;
  try {
    if (!username) throw new Error("Username is required");
    const userId = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!userId) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    await prisma.todo.deleteMany({
      where: {
        userId: userId.id,
      },
    });
    const user = await prisma.user.delete({
      where: {
        username,
      },
    });
    res.json("User deleted successfully!");
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
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
        res.json({ result, username: user.username, id: user.id });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

userRoute.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default userRoute;
