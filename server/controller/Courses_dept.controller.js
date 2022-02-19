const {
    selectAllCourses_dept,
   insertCourse_dept,
   updateCourse_dept,
   deleteCourse_dept
  } = require('../quries/Course_dept.js');
  


  ////////////////////////////////////////////////////////////
///////******************Get ******************//////////

  module.exports.getAllCoursesDept = async (req, res, next) => {
    try {
      const result = await selectAllCourses_dept();
      // if all is okay
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error,
      });
    }
  }; //end of exports
  
  ////////////////////////////////////////////////////////////
///////******************Insert ******************//////////

  module.exports.insertCourse_deptController = async (req, res, next) => {
    const {crs_id, dept_id} = req.body;
    if (crs_id && dept_id) {
      try {
        const result = await insertCourse_dept(
          crs_id,
          dept_id,
        );
        res.status(201).json({
          success: true,
          data: result,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error,
        });
      }
    } //end of if
    else {
      res.status(500).json({
        success: false,
        message: 'error with req.param',
      });
    }
  }; //end of exports
  
////////////////////////////////////////////////////////////
///////******************Update ******************//////////


  module.exports.updateCourse_DeptController = async (req, res, next) => {
    const { crs_dept_id, crs_id, dept_id} = req.body;
    if (crs_id && crs_dept_id && dept_id) {
      try {
        const result = await updateCourse_dept(
          crs_dept_id,
          crs_id,
          dept_id,
        );
        res.status(201).json({
          success: true,
          data: result,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error,
        });
      }
    } //end of if
    else {
      res.status(500).json({
        success: false,
        message: 'error with req.param',
      });
    }
  }; //end of exports
  

////////////////////////////////////////////////////////////
///////******************Delete ******************//////////


    module.exports.deleteCourse_deptController = async (req, res, next) => {
    const id = req.params.id;
    if (id) {
      try {
        const result = await deleteCourse_dept(id);
        res.status(201).json({
          success: true,
          data: result,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error,
        });
      }
    } //end of if
    else {
      res.status(500).json({
        success: false,
        message: 'error with req.param',
      });
    }
  }; //end of exports