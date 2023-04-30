const Teacher = require("../models/teacher");
const simil = require("compute-cosine-similarity");

const getSimilarTeachers = async (req, res) => {
  const topNresults = 5;

  const { teacher } = req.query;

  console.log(req.query);
  const queryObject = {};

  if (teacher) {
    queryObject.teacher = { $regex: teacher, $options: "i" };
  }

  let targetTeacher = await Teacher.find(queryObject);

  if (teacher) {
    queryObject.teacher = { $ne: targetTeacher[0]["teacher"] };
  }

  // allteachers except the target teacher
  let allTeachers = await Teacher.find(queryObject).lean();

  targetTeacherArray = [];
  targetTeacherArray.push(targetTeacher[0]["teaching_score"]);
  targetTeacherArray.push(targetTeacher[0]["grading_score"]);
  targetTeacherArray.push(targetTeacher[0]["courseload_score"]);
  targetTeacherArray.push(targetTeacher[0]["chill_score"]);
  targetTeacherArray.push(targetTeacher[0]["boring_score"]);
  targetTeacherArray.push(targetTeacher[0]["std_recom"]);
  targetTeacherArray.push(targetTeacher[0]["overall_score"]);

  /// calculating similarities
  for (let i = 0; i < allTeachers.length; i++) {
    tempArr = [];
    tempArr.push(allTeachers[i]["teaching_score"]);
    tempArr.push(allTeachers[i]["grading_score"]);
    tempArr.push(allTeachers[i]["courseload_score"]);
    tempArr.push(allTeachers[i]["chill_score"]);
    tempArr.push(allTeachers[i]["boring_score"]);
    tempArr.push(allTeachers[i]["std_recom"]);
    tempArr.push(allTeachers[i]["overall_score"]);

    allTeachers[i]["similarity"] = simil(targetTeacherArray, tempArr);
    //console.log(allTeachers[i]["similarity"]);
    console.log(allTeachers[i]);
  }

  // sorting
  allTeachers.sort(function (a, b) {
    return b.similarity - a.similarity;
  });

  // selectin topnResutls
  allTeachers = allTeachers.slice(0, topNresults);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).json({ allTeachers, nbHits: allTeachers.length });
};

module.exports = {
  getSimilarTeachers,
};
