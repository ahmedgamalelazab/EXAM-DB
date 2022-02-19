const Router = require('express').Router();
const {
  getAllCourses,
  insertCourseController,
  updateCourseRecordController,
} = require('../controller/Courses.controller.js');

Router.route('/ExamApp/api/v1/Courses').get(getAllCourses);
Router.route('/ExamApp/api/v1/Courses').post(insertCourseController);
Router.route('/ExamApp/api/v1/Courses').put(updateCourseRecordController);

module.exports = Router;
