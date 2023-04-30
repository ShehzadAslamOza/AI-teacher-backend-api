const express = require("express");
const router = express.Router();

const { getSimilarTeachers } = require("../controllers/similarity");

router.route("/").get(getSimilarTeachers);

module.exports = router;
