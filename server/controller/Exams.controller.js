const {
  selectAllExams,
  insertExam,
  updateExam,
  deleteExam,
  generatePracticalExamQuestions,
} = require('../quries/Exams.js');

const {
  knexQueryBuilderHelper,
} = require('../database/knexConnection/KnexConnection.js');

const tableNames = require('../database/tables/tables.js');

const { request, response } = require('express');
const { default: knex } = require('knex');

const jwt = require('jsonwebtoken');

/**
 *
 * @param {request} req
 * @param {response} res
 * @desc get all the exams records in the db .. admin only who can do so ..
 */
module.exports.getAllExamsController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    try {
      const result = await selectAllExams();
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err,
      });
      return;
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
    return;
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @desc  insert exam record in the db .. only the instructor who can add exam in the db
 */
module.exports.insertExamController = async (req, res, next) => {
  if (req.payload.userType === 'instructor') {
    const { exam_name, duration, total_marks, instructor_id } = req.body;

    if (exam_name && duration && total_marks && instructor_id) {
      try {
        const result = await insertExam(
          exam_name,
          duration,
          total_marks,
          instructor_id
        );
        res.status(201).json({
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
      res.status(500).json({
        success: false,
        message: 'error with req.param',
      });
      return;
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
    return;
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @desc    update exam record in the db .. only the instructor who can do so ..
 */
module.exports.updateExamController = async (req, res, next) => {
  if (req.payload.userType === 'instructor') {
    const { id, exam_name, duration, total_marks, instructor_id } = req.body;

    if (id && exam_name && duration && total_marks && instructor_id) {
      try {
        const result = await updateExam(
          id,
          exam_name,
          duration,
          total_marks,
          instructor_id
        );
        res.status(201).json({
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
      res.status(500).json({
        success: false,
        message: 'error with req.param',
      });
      return;
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
    return;
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @desc   delete exam record from the db .. for now the only one who can do so is the admin
 * @desc   it's not make sense that the admin can delete someone else exam but we will consider as service banned or punishment
 */
module.exports.deleteExamController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const id = req.params.id;

    if (id) {
      try {
        const result = await deleteExam(id);
        res.status(201).json({
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
      res.status(500).json({
        success: false,
        message: 'error with req.param',
      });
      return;
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
    return;
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports.generatePracticalExamController = async (req, res, next) => {
  //TODO this request not protected
  try {
    const result = await generatePracticalExamQuestions();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `error generating practical exam questions`,
      error: err,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports.storeStudentExamResultController = async function (
  req,
  res,
  next
) {
  //take a payload from the front

  if (req.payload.userType === 'student') {
    console.log(req.body);

    const { userLoad } = req.payload;

    /*
    {
      "id": "FBCCE403-3A42-4392-AA67-02E89E26A91B",
      "first_name": "kareem",
      "last_name": "ali",
      "email": "realStudent@gmail.com",
      "password": "12345678",
      "student_id": "8481F5CF-8F9C-47DA-BC75-3867F53A55F6",
      "student_phone_number": "99009900",
      "student_department": "Mean Stack",
      "iat": 1645808612
    }
  */

    const {
      exam_type,
      studentExamMarks,
      examFullMarks,
      examModelAnswer,
      studentAnswerModel,
    } = req.body;

    knexQueryBuilderHelper.transaction(async trx => {
      try {
        await knexQueryBuilderHelper(tableNames.exam)
          .insert({
            exam_name: userLoad.email,
            exam_type: exam_type,
            total_marks: examFullMarks,
          })
          .transacting(trx);

        const recentExam = await knexQueryBuilderHelper(tableNames.exam)
          .where({
            exam_name: userLoad.email,
          })
          .transacting(trx);

        /**
         * @important this is the most important sql query ever
         */
        await Promise.all(
          studentAnswerModel.map(record => {
            return knexQueryBuilderHelper(tableNames.student_exam_question)
              .insert({
                exam_id: recentExam[recentExam.length - 1].id,
                student_id: userLoad.student_id,
                question_id: Number.parseInt(record.id),
                answer: record.student_answer,
              })
              .transacting(trx);
          })
        );

        await knexQueryBuilderHelper(tableNames.studentExamMarks)
          .insert({
            totalMarks: studentExamMarks,
            exam_id: recentExam[recentExam.length - 1].id,
            student_id: userLoad.student_id,
          })
          .transacting(trx);

        res.status(201).json({
          success: true,
          data: req.body,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: 'transaction fail',
        });
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};
