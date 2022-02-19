const {
  insertStudentRecord,
  getAllStudentsUserRecords,
} = require('../quries/Student.js');
const { request, response } = require('express');

/**
 * @desc controller use incoming request from the front side and returns back inserted rows
 * @param {request} req
 * @param {response} res
 */
module.exports.insertStudentController = async (req, res, next) => {
  const { first_name, last_name, email, password, phone_number, ins_id } =
    req.body;

  //TODO check for the incoming request params

  try {
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
};

/**
 * @desc controller get all the students recorded in the db
 * @param {request} req
 * @param {response} res
 */
module.exports.getAllStudentsController = async (req, res, next) => {
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
};
