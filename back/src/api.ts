import { Router } from "express";

const app = Router();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/config", (req, res) => {
  const config = {
    samples: Math.floor(Math.random() * 101),
    multiplicationFactor: Math.floor(Math.random() * 101),
  };
  res.json(config);
});

app.get("/date", (req, res) => {
  res.json({
    date: new Date(),
  });
});

export const api = app;
