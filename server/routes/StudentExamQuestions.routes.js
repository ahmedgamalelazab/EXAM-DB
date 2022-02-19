const Router = require('express').Router();
const {
    getAllStudentExamQuestionsController,
    insertStudentExamQuestionController,
    updateStudentExamQuestionController,
    deleteStudentExamQuestionController
} = require('../controller/StudentExamQuestions.controller.js');

Router.route('/ExamApp/api/v1/StudentExamQuestions').get(getAllStudentExamQuestionsController);

Router.route('/ExamApp/api/v1/StudentExamQuestions').post(insertStudentExamQuestionController);

Router.route('/ExamApp/api/v1/StudentExamQuestions').put(updateStudentExamQuestionController);

Router.route('/ExamApp/api/v1/StudentExamQuestions/:id').delete(deleteStudentExamQuestionController);

module.exports = Router;
