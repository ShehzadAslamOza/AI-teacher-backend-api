require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const teacherRouter = require("./routes/teachers");
const commentRouter = require("./routes/comments");
const similarityRouter = require("./routes/similarity");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send(
    '<h1>Teachers API</h1><a href="/api/v1/teachers">teachers route</a>'
  );
});

app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/similarity", similarityRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
