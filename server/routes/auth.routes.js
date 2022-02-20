const Router = require('express').Router();
const { loginUserAndDispatch } = require('../controller/auth.controller.js');
Router.route('/ExamApp/api/v1/login').post(loginUserAndDispatch);
module.exports = Router;
