const Router = require('express').Router();
const {
  getAllStudentsController,
  insertStudentController,
} = require('../controller/Student.controller.js');

Router.route('/ExamApp/api/v1/Student').get(getAllStudentsController);

Router.route('/ExamApp/api/v1/Student').post(insertStudentController);

// Router.route('/ExamApp/api/v1/Student').put(
//   updateDepartmentRecordController
// );

// Router.route('/ExamApp/api/v1/Student/:id').delete(
//   deleteDepartmentController
// );

module.exports = Router;
