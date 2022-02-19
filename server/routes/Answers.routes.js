const Router = require('express').Router();
const {
    getAllAnswersController,
    insertAnswerController,
    updateAnswerController,
    deleteAnswerController
} = require('../controller/Answers.controller.js');

Router.route('/ExamApp/api/v1/Answers').get(getAllAnswersController);

Router.route('/ExamApp/api/v1/Answers').post(insertAnswerController);

Router.route('/ExamApp/api/v1/Answers').put(
    updateAnswerController
);

Router.route('/ExamApp/api/v1/Answers/:id').delete(
    deleteAnswerController
);

module.exports = Router;
