const {
  insertStudentRecord,
  getAllStudentsUserRecords,
  getStudentExamReportPractical,
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

    const { userLoad } = req.payload;

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

      /*
      {
        "id": "4BDD3566-BFBA-4950-82C6-47958FF9BE43",
        "first_name": "ahmed",
        "last_name": "gamal",
        "email": "jimmy@gmail.com",
        "password": "123456789",
        "ins_id": "2E64FD29-6A50-484E-B4B9-2B8CE530366F",
        "ins_phone_number": "01032122442",
        "ins_department": "Backend Development",
        "iat": 1645929148
      }
      */
      const result = await insertStudentRecord(
        first_name,
        last_name,
        email,
        password,
        phone_number,
        userLoad.ins_id
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

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports.getStudentPracticalExamAnswerReportSheetController = async (
  req,
  res,
  next
) => {
  //no one is allowed to ask for this query except only the student and the instructor
  if (
    req.payload.userType === 'student' ||
    req.payload.userType === 'instructor'
  ) {
    //if the user is student or instructor

    const student_id = req.query.student_id;
    const exam_id = req.query.exam_id;
    console.log(req.query);
    //check for the params
    if (student_id && exam_id) {
      try {
        const result = await getStudentExamReportPractical(exam_id, student_id);
        //if there's no errors
        res.status(200).json({
          success: true,
          data: result,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'server cannot resolve the exam answers request',
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: 'server cannot resolve the request params',
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};
