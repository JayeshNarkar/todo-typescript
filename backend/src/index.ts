import userRoute from "./routes/user";
import express from "express";
import todoRoute from "./routes/todo";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Todo App API");
});

app.use("/api", userRoute);
app.use("/api", todoRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
