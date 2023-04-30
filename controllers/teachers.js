const Teacher = require("../models/teacher");

const getAllTeachers = async (req, res) => {
  const {
    teacher,
    teaching_l,
    grading_l,
    courseload_l,
    chill_l,
    boring_l,
    sort,
    fields,
    numericFilters,
    subjects,
  } = req.query;
  console.log(req.query);
  const queryObject = {};

  if (teacher) {
    queryObject.teacher = { $regex: teacher, $options: "i" };
  }

  if (subjects) {
    queryObject.subjects = { $all: [subjects] };
  }

  if (teaching_l) {
    queryObject.teaching_l = teaching_l;
  }

  if (grading_l) {
    queryObject.grading_l = grading_l;
  }

  if (courseload_l) {
    queryObject.courseload_l = courseload_l;
  }

  if (chill_l) {
    queryObject.chill_l = chill_l;
  }

  if (boring_l) {
    queryObject.boring_l = boring_l;
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = [
      "teaching_score",
      "grading_score",
      "courseload_score",
      "chill_score",
      "boring_score",
      "std_recom",
      "overall_score",
    ];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  let result = Teacher.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;
  // result = result.skip(skip).limit(limit);

  const teachers = await result;
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).json({ teachers, nbHits: teachers.length });
};

module.exports = {
  getAllTeachers,
};
