const {
  selectAllExams,
  insertExam,
  updateExam,
  deleteExam,
} = require('../quries/Exams.js');

const { request, response } = require('express');

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
