const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

module.exports.CreateSelectAllCoursesProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                      CREATE or ALTER PROC ${DBProcedureDictionary.selectAllCourses}
                      AS
                      BEGIN
                      SELECT course.name as courseName, course.total_hours as totalHours, course.id as courseId,
                      topic.name as topicName  FROM course, topic where course.topic_id = topic.id
                      END;
                  `);
        resolve({
          success: true,
          data: 'CreateSelectAllCoursesProc went well',
        });
      } catch (error) {
        // end of try
        reject({
          success: false,
          error: error,
        });
      } //end of catch
    } //end of if
    else {
      reject({
        success: false,
        error: `{
                  error : 'mssql db is not connected ..',
                  object : dbPoolConnection,
                  function:'CreateSelectAllCoursesProc'
              }`,
      });
    }
  }); //end of promise
}; //end of exports

/**
 * @desc  insert a course record into the course table with course @crs_name AS varchar(max) param, @crs_total_hours AS int,@crs_topic_id As int
 * @returns {Promise<Object>}
 */

 

module.exports.CreateInsertCourseProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                      CREATE or ALTER PROC ${DBProcedureDictionary.insertCourse}
                      (
  
                        @crs_name AS varchar(max),
                        @crs_total_hours AS int,
                        @crs_topic_id AS int
                      )
                      AS
                      BEGIN
                      insert into course values(@crs_name,@crs_total_hours,@crs_topic_id);
                      END;
                  `);
        resolve({
          success: true,
          data: 'insert procedure went well',
        });
      } catch (error) {
        // end of try
        console.log(error);
        reject({
          success: false,
          error: error,
        });
      } //end of catch
    } //end of if
    else {
      reject({
        success: false,
        error: `{
                  error : 'mssql db is not connected ..',
                  object : dbPoolConnection,
                  function: ${DBProcedureDictionary.insertCourse}
              }`,
      });
    }
  }); //end of promise
}; //end of exports




/**
 * @desc required params to insert @crs_id as int
 * @desc required params to insert  @crs_name AS varchar(max) param, @crs_total_hours AS int,@crs_topic_id As int
 * @returns {Promise<Object>}
 */
module.exports.CreateUpdateCourseProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                      CREATE or ALTER PROC ${DBProcedureDictionary.updateCourseByID}
                      (
                        @crs_id AS int,
                        @crs_name AS varchar(max),
                        @crs_total_hours AS int,
                        @crs_topic_id AS int
                      )
                      AS
                      BEGIN
                      update course
                      set name = @crs_name , total_hours = @crs_total_hours, topic_id = @crs_topic_id 
                      where id = @crs_id
                      END;
                  `);
        resolve({
          success: true,
          data: 'update procedure went well',
        });
      } catch (error) {
        // end of try
        console.log(error);
        reject({
          success: false,
          error: error,
        });
      } //end of catch
    } //end of if
    else {
      reject({
        success: false,
        error: `{
                  error : 'mssql db is not connected ..',
                  object : dbPoolConnection,
                  function: ${DBProcedureDictionary.updateCourseByID}
              }`,
      });
    }
  }); //end of promise
}; //end of exports



/**
 * @desc required param to delete record @crs_id as int
 * @returns {Promise<Object>}
 */
module.exports.CreateDeleteCourseProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                      CREATE or ALTER PROC ${DBProcedureDictionary.deleteCourseByID}
                      (
                        @crs_id AS int
                      )
                      AS
                      BEGIN
                      delete course
                      where id = @crs_id
                      END;
                  `);
        resolve({
          success: true,
          data: 'Course is deleted',
        });
      } catch (error) {
        // end of try
        // console.log(error);
        reject({
          success: false,
          error: error,
        });
      } //end of catch
    } //end of if
    else {
      reject({
        success: false,
        error: `{
                  error : 'mssql db is not connected ..',
                  object : dbPoolConnection,
                  function: ${DBProcedureDictionary.deleteCourseByID}
              }`,
      });
    }
  }); //end of promise
}; //end of exports