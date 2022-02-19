const Router = require('express').Router();
const {
    getAllTopics,
    insertTopicsController,
    updateTopicRecordController,
    deleteTopicController,
} = require('../controller/Topics.controller');

Router.route('/ExamApp/api/v1/Topics').get(getAllTopics);

Router.route('/ExamApp/api/v1/Topics').post(insertTopicsController);

Router.route('/ExamApp/api/v1/Topics').put(updateTopicRecordController);

Router.route('/ExamApp/api/v1/Topics/:id').delete(deleteTopicController);

module.exports = Router;
