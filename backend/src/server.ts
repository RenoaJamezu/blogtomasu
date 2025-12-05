import express from "express";

const app = express();

// route
app.get('/', (req, res) => {
  res.send("Welcome to BlogTomasu");
});

export default app;