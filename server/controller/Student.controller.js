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

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports.getLoggedStudentController = async function (req, res, next) {
  // {
  //   "id": "FBCCE403-3A42-4392-AA67-02E89E26A91B",
  //   "first_name": "kareem",
  //   "last_name": "ali",
  //   "email": "realStudent@gmail.com",
  //   "password": "12345678",
  //   "student_id": "8481F5CF-8F9C-47DA-BC75-3867F53A55F6",
  //   "student_phone_number": "99009900",
  //   "student_department": "Mean Stack",
  //   "iat": 1645808612
  // }

  if (req.payload.userType === 'student') {
    const { userLoad } = req.payload;

    const result = await knexQueryBuilderHelper(
      tableNames.studentExamMarks
    ).where({
      student_id: userLoad.student_id,
    });

    userLoad.totalExamsSolvedByStudent = result.length;

    res.status(200).json({
      userLoad,
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};

module.exports.getStudentSolvedExamsController = async (req, res, next) => {
  if (req.payload.userType === 'student') {
    const { userLoad } = req.payload;

    const result = await knexQueryBuilderHelper(
      tableNames.studentExamMarks
    ).where({
      student_id: userLoad.student_id,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};
