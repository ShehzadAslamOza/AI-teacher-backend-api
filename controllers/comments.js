const Comment = require("../models/comment");

const getAllComments = async (req, res) => {
  const { teacher } = req.query;

  console.log(req.query);
  const queryObject = {};

  if (teacher) {
    queryObject.teacher = { $regex: teacher, $options: "i" };
  }

  let result = Comment.find(queryObject);
  const comments = await result;
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).json({ comments, nbHits: comments.length });
};

module.exports = {
  getAllComments,
};
