const Router = require('express').Router();
const {
  insertInstructorController,
  getAllInstructorsController,
  deleteInstructorController,
} = require('../controller/Instructor.controller.js');

Router.route('/ExamApp/api/v1/Instructor').get(getAllInstructorsController);

Router.route('/ExamApp/api/v1/Instructor').post(insertInstructorController);

// Router.route('/ExamApp/api/v1/Instructor').put(
//   updateDepartmentRecordController
// );

Router.route('/ExamApp/api/v1/Instructor').delete(deleteInstructorController);

module.exports = Router;
