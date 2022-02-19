const Router = require('express').Router();
const {
    getAllQuestionsController,
    insertQuestionController,
    updateQuestionController,
    deleteQuestionController
} = require('../controller/Questions.controller.js');

Router.route('/ExamApp/api/v1/Questions').get(getAllQuestionsController);

Router.route('/ExamApp/api/v1/Questions').post(insertQuestionController);

Router.route('/ExamApp/api/v1/Questions').put(
    updateQuestionController
);

Router.route('/ExamApp/api/v1/Questions/:id').delete(
    deleteQuestionController
);

module.exports = Router;
