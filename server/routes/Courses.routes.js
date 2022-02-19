const Router = require('express').Router();
const {
  getAllCourses,
  insertCourseController,
  updateCourseRecordController,
  deleteCourseRecordController
} = require('../controller/Courses.controller.js');

Router.route('/ExamApp/api/v1/Courses').get(getAllCourses);
Router.route('/ExamApp/api/v1/Courses').post(insertCourseController);
Router.route('/ExamApp/api/v1/Courses').put(updateCourseRecordController);
Router.route('/ExamApp/api/v1/Courses/:id').delete(deleteCourseRecordController);
module.exports = Router;
