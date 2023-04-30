const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "comment must be provided"],
  },
  teacher: {
    type: String,
    required: [true, "teacher name must be provided"],
  },
  subject: {
    type: String,
    required: [true, "subject name must be provided"],
  },
});

module.exports = mongoose.model("Comment", commentSchema);
