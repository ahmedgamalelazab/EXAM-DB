const Router = require('express').Router();
const {
  getAllCoursesDept,
  insertCourse_deptController,
  updateCourse_DeptController,
  deleteCourse_deptController
} = require('../controller/Courses_dept.controller');

Router.route('/ExamApp/api/v1/Courses_Dept').get(getAllCoursesDept);
Router.route('/ExamApp/api/v1/Courses_Dept').post(insertCourse_deptController);
Router.route('/ExamApp/api/v1/Courses_Dept').put(updateCourse_DeptController);
Router.route('/ExamApp/api/v1/Courses_Dept/:id').delete(deleteCourse_deptController);
module.exports = Router;
