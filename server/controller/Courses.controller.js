const {
  selectAllCourses,
  insertCourses,
  updateCourses,
  deleteCourse,
} = require('../quries/Courses.js');

module.exports.getAllCourses = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    try {
      const result = await selectAllCourses();
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
  } else {
    res.status(403).json({
      success: false,
      message: forbidden,
    });
  }
}; //end of exports

module.exports.insertCourseController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const { crs_name, crs_total_hours, crs_topic_id } = req.body;
    if (crs_name && crs_total_hours && crs_topic_id) {
      try {
        const result = await insertCourses(
          crs_name,
          crs_total_hours,
          crs_topic_id
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
  } else {
    res.status(403).json({
      success: false,
      message: forbidden,
    });
  }
}; //end of exports

module.exports.updateCourseRecordController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const { crs_id, crs_name, crs_total_hours, crs_topic_id } = req.body;
    if (crs_id && crs_name && crs_total_hours && crs_topic_id) {
      try {
        const result = await updateCourses(
          crs_id,
          crs_name,
          crs_total_hours,
          crs_topic_id
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
  } else {
    res.status(403).json({
      success: false,
      message: forbidden,
    });
  }
}; //end of exports

module.exports.deleteCourseRecordController = async (req, res, next) => {
  if (req.payload.userType === 'admin') {
    const id = req.params.id;
    if (id) {
      try {
        const result = await deleteCourse(id);
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
  } else {
    res.status(403).json({
      success: false,
      message: forbidden,
    });
  }
}; //end of exports
