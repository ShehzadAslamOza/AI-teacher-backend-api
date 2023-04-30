const express = require("express");
const router = express.Router();

const { getAllTeachers } = require("../controllers/teachers");

router.route("/").get(getAllTeachers);

module.exports = router;
