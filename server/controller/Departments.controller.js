const {
  selectAllDepartments,
  insertDepartmentRecord,
  deleteDepartment,
  updateDepartment,
} = require('../quries/Department.js');

module.exports.getAllDepartments = async (req, res, next) => {
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
};

module.exports.insertDepartmentController = async (req, res, next) => {
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
};

module.exports.updateDepartmentRecordController = async (req, res, next) => {
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
};

module.exports.deleteDepartmentController = async (req, res, next) => {
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
};
