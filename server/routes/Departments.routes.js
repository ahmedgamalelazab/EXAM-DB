const Router = require('express').Router();
const {
  getAllDepartments,
  insertDepartmentController,
  deleteDepartmentController,
  updateDepartmentRecordController,
} = require('../controller/Departments.controller.js');

Router.route('/ExamApp/api/v1/Departments').get(getAllDepartments);

Router.route('/ExamApp/api/v1/Departments').post(insertDepartmentController);

Router.route('/ExamApp/api/v1/Departments').put(
  updateDepartmentRecordController
);

Router.route('/ExamApp/api/v1/Departments/:id').delete(
  deleteDepartmentController
);

module.exports = Router;
