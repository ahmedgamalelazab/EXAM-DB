const {
  insertInstructorRecord,
  getAllInstructorsUserRecords,
  deleteInstructorRecord,
  getInstructorStudents,
} = require('../quries/Instructor.js');
const { request, response } = require('express');
const { development } = require('../knexfile.js');
const knexQueryBuilderHelper = require('knex').knex(development);
const tableNames = require('../database/tables/tables.js');

/**
 * @desc use incoming request from the front side and return the rows effected from the db
 * @param {request} req
 * @param {response} res
 */
module.exports.insertInstructorController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const {
      crs_id,
      dept_id,
      first_name,
      last_name,
      email,
      password,
      phone_number,
      salary,
    } = req.body;

    //TODO check for the incoming request params

    try {
      //TODO check for the exist email if there's email then tell him email exist else login

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

      const result = await insertInstructorRecord(
        first_name,
        last_name,
        email,
        password,
        phone_number,
        salary,
        crs_id,
        dept_id
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
 * @desc get all the instructors from the db
 * @param {request} req
 * @param {response} res
 */
module.exports.getAllInstructorsController = async (req, res, next) => {
  try {
    const result = await getAllInstructorsUserRecords();

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
};

module.exports.deleteInstructorController = async (req, res, next) => {
  const { email, ins_id } = req.body;

  try {
    const result = await deleteInstructorRecord(email, ins_id);
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
};

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports.getInstructorStudentsController = async (req, res, next) => {
  //only the instructor is allowed to this
  if (req.payload.userType === 'instructor') {
    //if the user is instructor
    //then we will allow him to call this request
    try {
      const { userLoad } = req.payload;
      console.log(userLoad.ins_id);
      const result = await getInstructorStudents(userLoad.ins_id);
      //if all are ok
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  } else {
    console.log(err);
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};
