const Router = require('express').Router();
const {
  getAllExamsController,
  insertExamController,
  updateExamController,
  deleteExamController,
} = require('../controller/Exams.controller.js');

const { authMiddleWere } = require('../middleware/auth.js');

Router.route('/ExamApp/api/v1/Exam').get(authMiddleWere, getAllExamsController);

Router.route('/ExamApp/api/v1/Exam').post(authMiddleWere, insertExamController);

Router.route('/ExamApp/api/v1/Exam').put(authMiddleWere, updateExamController);

Router.route('/ExamApp/api/v1/Exam/:id').delete(
  authMiddleWere,
  deleteExamController
);

module.exports = Router;
