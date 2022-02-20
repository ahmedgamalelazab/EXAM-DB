const {
  insertStudentRecord,
  getAllStudentsUserRecords,
} = require('../quries/Student.js');
const { request, response } = require('express');
const { development } = require('../knexfile.js');
const knexQueryBuilderHelper = require('knex').knex(development);
const tableNames = require('../database/tables/tables.js');

/**
 * @desc controller use incoming request from the front side and returns back inserted rows
 * @param {request} req
 * @param {response} res
 */
module.exports.insertStudentController = async (req, res, next) => {
  if (req.payload.userType === 'instructor') {
    const { first_name, last_name, email, password, phone_number, ins_id } =
      req.body;

    //TODO check for the incoming request params

    try {
      //search fro the email
      let user = await knexQueryBuilderHelper(tableNames.mainUser).where({
        email: email,
      });

      if (user.length !== 0) {
        //email exist
        res.status(401).json({
          success: false,
          message: 'this email registered already !',
        });
        return;
      }
      const result = await insertStudentRecord(
        first_name,
        last_name,
        email,
        password,
        phone_number,
        ins_id
      );
      //if all are ok !
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};

/**
 * @desc controller get all the students recorded in the db
 * @param {request} req
 * @param {response} res
 */
module.exports.getAllStudentsController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    try {
      const result = await getAllStudentsUserRecords();

      //console.log(result); testing the incoming result
      //if all went well
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};
