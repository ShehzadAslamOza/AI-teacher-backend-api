require("dotenv").config();

const connectDB = require("../db/connect");
const Product = require("./models/product");
const Faltu = require("./models/faltu");
const Teacher = require("../models/teacher");
const Comment = require("../models/comment");

const jsonProducts = require("./products.json");
const jsonComments = require("../data/comments.json");
const jsonTeachers = require("../data/teachers.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Teacher.deleteMany();
    await Teacher.create(jsonTeachers);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
