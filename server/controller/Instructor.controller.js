const {
  insertInstructorRecord,
  getAllInstructorsUserRecords,
  deleteInstructorRecord,
} = require('../quries/Instructor.js');
const { request, response } = require('express');

/**
 * @desc use incoming request from the front side and return the rows effected from the db
 * @param {request} req
 * @param {response} res
 */
module.exports.insertInstructorController = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    salary,
    crs_id,
    dept_id,
  } = req.body;

  //TODO check for the incoming request params

  try {
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
