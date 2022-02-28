const { request, response } = require('express');
const {
  selectAllDepartments,
  insertDepartmentRecord,
  deleteDepartment,
  updateDepartment,
  getDepartmentStudents,
} = require('../quries/Department.js');

/**
 * @desc get all the departments and only and only the admin can get all the departments
 * @param {request} req
 * @param {response} res
 *
 */
module.exports.getAllDepartments = async (req, res, next) => {
  console.log(req.payload);

  //only admin is allowed to get the result
  if (req.payload.userType === 'admin') {
    try {
      const result = await selectAllDepartments();
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
    //no body else allowed to get the students
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};

module.exports.insertDepartmentController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const { dept_name } = req.body;

    if (dept_name) {
      try {
        const result = await insertDepartmentRecord(dept_name);
        //if all went well
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
    }
  } else {
    //no body else allowed to get the students
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};

module.exports.updateDepartmentRecordController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const { id, dept_name } = req.body;

    if (id && dept_name) {
      try {
        const result = await updateDepartment(id, dept_name);
        //if all went well
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
    }
  } else {
    //no body else allowed to get the students
    res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }
};

module.exports.deleteDepartmentController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const id = req.params.id;

    if (id) {
      try {
        const result = await deleteDepartment(id);
        //if all went well
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
module.exports.getDepartmentStudentByIdController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const deptId = req.query.dept_id;
    const result = await getDepartmentStudents(deptId);
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
