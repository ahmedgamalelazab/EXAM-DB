const Router = require('express').Router();
const {
  getAllTopics,
  insertTopicsController,
  updateTopicRecordController,
  deleteTopicController,
  generateTopicCoursesController,
} = require('../controller/Topics.controller');

const { authMiddleWere } = require('../middleware/auth.js');

Router.route('/ExamApp/api/v1/Topics').get(authMiddleWere, getAllTopics);

Router.route('/ExamApp/api/v1/Topics').post(
  authMiddleWere,
  insertTopicsController
);

Router.route('/ExamApp/api/v1/Topics').put(
  authMiddleWere,
  updateTopicRecordController
);

Router.route('/ExamApp/api/v1/Topics/courses').get(
  authMiddleWere,
  generateTopicCoursesController
);

Router.route('/ExamApp/api/v1/Topics/:id').delete(
  authMiddleWere,
  deleteTopicController
);

module.exports = Router;
