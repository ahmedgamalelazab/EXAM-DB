const Router = require('express').Router();
const {
  getAllDepartments,
  insertDepartmentController,
  deleteDepartmentController,
  updateDepartmentRecordController,
  getDepartmentStudentByIdController,
} = require('../controller/Departments.controller.js');

const { authMiddleWere } = require('../middleware/auth.js');

//only the admin will have the authorization of doing this operations on the departments
Router.route('/ExamApp/api/v1/Departments').get(
  authMiddleWere,
  getAllDepartments
);
Router.route('/ExamApp/api/v1/Departments/students').get(
  authMiddleWere,
  getDepartmentStudentByIdController
);

Router.route('/ExamApp/api/v1/Departments').post(
  authMiddleWere,
  insertDepartmentController
);

Router.route('/ExamApp/api/v1/Departments').put(
  authMiddleWere,
  updateDepartmentRecordController
);

Router.route('/ExamApp/api/v1/Departments/:id').delete(
  authMiddleWere,
  deleteDepartmentController
);

module.exports = Router;
