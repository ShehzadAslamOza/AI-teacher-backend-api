const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacher: {
    type: String,
    required: [true, "teacher name must be provided"],
  },
  teaching_score: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  grading_score: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  courseload_score: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  chill_score: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  boring_score: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  teaching_l: {
    type: String,
    required: [true, "product name must be provided"],
  },
  grading_l: {
    type: String,
    required: [true, "product name must be provided"],
  },
  courseload_l: {
    type: String,
    required: [true, "product name must be provided"],
  },
  chill_l: {
    type: String,
    required: [true, "product name must be provided"],
  },
  boring_l: {
    type: String,
    required: [true, "product name must be provided"],
  },
  std_recom: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  overall_score: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  subjects: {
    type: [String],
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
