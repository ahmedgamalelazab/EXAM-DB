const Router = require('express').Router();
const {
    getAllExamsController,
    insertExamController,
    updateExamController,
    deleteExamController
} = require('../controller/Exams.controller.js');

Router.route('/ExamApp/api/v1/Exam').get(getAllExamsController);

Router.route('/ExamApp/api/v1/Exam').post(insertExamController);

Router.route('/ExamApp/api/v1/Exam').put(updateExamController);

Router.route('/ExamApp/api/v1/Exam/:id').delete(deleteExamController);

module.exports = Router;
