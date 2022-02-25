const Router = require('express').Router();
const {
  getAllStudentsController,
  insertStudentController,
  getLoggedStudentController,
  getStudentSolvedExamsController,
} = require('../controller/Student.controller.js');
const { authMiddleWere } = require('../middleware/auth.js');

//who can only get all the students
//admin only who can
Router.route('/ExamApp/api/v1/Student').get(
  authMiddleWere,
  getAllStudentsController
);

Router.route('/ExamApp/api/v1/Student/profile').get(
  authMiddleWere,
  getLoggedStudentController
);

Router.route('/ExamApp/api/v1/Student/solvedExams').get(
  authMiddleWere,
  getStudentSolvedExamsController
);

//who can insert a student .. ? only the instructor who can do that !
Router.route('/ExamApp/api/v1/Student').post(
  authMiddleWere,
  insertStudentController
);

// Router.route('/ExamApp/api/v1/Student').put(
//   updateDepartmentRecordController
// );

// Router.route('/ExamApp/api/v1/Student/:id').delete(
//   deleteDepartmentController
// );

module.exports = Router;
