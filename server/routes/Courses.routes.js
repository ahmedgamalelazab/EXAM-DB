const Router = require('express').Router();
const {
  getAllCourses,
  insertCourseController,
  updateCourseRecordController,
  deleteCourseRecordController,
} = require('../controller/Courses.controller.js');

const { authMiddleWere } = require('../middleware/auth.js');

Router.route('/ExamApp/api/v1/Courses').get(authMiddleWere, getAllCourses);
Router.route('/ExamApp/api/v1/Courses').post(
  authMiddleWere,
  insertCourseController
);
Router.route('/ExamApp/api/v1/Courses').put(
  authMiddleWere,
  updateCourseRecordController
);
Router.route('/ExamApp/api/v1/Courses/:id').delete(
  authMiddleWere,
  deleteCourseRecordController
);
module.exports = Router;
