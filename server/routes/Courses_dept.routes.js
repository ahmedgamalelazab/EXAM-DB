const Router = require('express').Router();
const {
  getAllCoursesDept,
  insertCourse_deptController,
  updateCourse_DeptController,
  deleteCourse_deptController,
} = require('../controller/Courses_dept.controller');

const { authMiddleWere } = require('../middleware/auth.js');

Router.route('/ExamApp/api/v1/Courses_Dept').get(
  authMiddleWere,
  getAllCoursesDept
);
Router.route('/ExamApp/api/v1/Courses_Dept').post(
  authMiddleWere,
  insertCourse_deptController
);
Router.route('/ExamApp/api/v1/Courses_Dept').put(
  authMiddleWere,
  updateCourse_DeptController
);
Router.route('/ExamApp/api/v1/Courses_Dept/:id').delete(
  authMiddleWere,
  deleteCourse_deptController
);
module.exports = Router;
