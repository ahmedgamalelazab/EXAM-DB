const Router = require('express').Router();
const {
  getAllExamsController,
  insertExamController,
  updateExamController,
  deleteExamController,
  generatePracticalExamController,
  storeStudentExamResultController,
} = require('../controller/Exams.controller.js');

const { authMiddleWere } = require('../middleware/auth.js');

Router.route('/ExamApp/api/v1/Exam').get(authMiddleWere, getAllExamsController);

Router.route('/ExamApp/api/v1/Exam').post(authMiddleWere, insertExamController);

Router.route('/ExamApp/api/v1/Exam/student/finished').post(
  authMiddleWere,
  storeStudentExamResultController
);

Router.route('/ExamApp/api/v1/Exam').put(authMiddleWere, updateExamController);

Router.route('/ExamApp/api/v1/Exam/:id').delete(
  authMiddleWere,
  deleteExamController
);

//unprotected routes
//TODO protect the route to ask for it only through out the student only

Router.route('/ExamApp/api/v1/Exam/practical').get(
  generatePracticalExamController
);

module.exports = Router;
