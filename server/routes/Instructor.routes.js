const Router = require('express').Router();
const {
  insertInstructorController,
  getAllInstructorsController,
  deleteInstructorController,
  getInstructorStudentsController,
} = require('../controller/Instructor.controller.js');

const { authMiddleWere } = require('../middleware/auth.js');

Router.route('/ExamApp/api/v1/Instructor').get(
  authMiddleWere,
  getAllInstructorsController
);

Router.route('/ExamApp/api/v1/Instructor/students').get(
  authMiddleWere,
  getInstructorStudentsController
);

Router.route('/ExamApp/api/v1/Instructor').post(
  authMiddleWere,
  insertInstructorController
);

// Router.route('/ExamApp/api/v1/Instructor').put(
//   updateDepartmentRecordController
// );

Router.route('/ExamApp/api/v1/Instructor').delete(
  authMiddleWere,
  deleteInstructorController
);

module.exports = Router;
