import express from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const todoRoute = express.Router();

todoRoute.get("/todos", async (req, res) => {
  const { userId } = req.body;
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

todoRoute.post("/todos", async (req, res) => {
  const { userId, title, description } = req.body;
  try {
    const newTodo = await prisma.todo.create({
      data: {
        userId,
        title,
        description,
      },
    });
    res.json("Todo created successfully");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

todoRoute.delete("/todos", async (req, res) => {
  const { id } = req.body;
  try {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    res.json("todo deleted successfully");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

todoRoute.put("/todos", async (req, res) => {
  const { id } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        done: true,
      },
    });
    res.json("Todo marked as done!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default todoRoute;
