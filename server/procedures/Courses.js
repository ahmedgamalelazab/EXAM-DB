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
                      SELECT * FROM course
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
 * @desc  insert a course record into the course table with course @crs_name AS varchar(max) param, @total_hours AS int,@topic_id As int
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
                        @total_hours AS int,
                        @topic_id AS int
                      )
                      AS
                      BEGIN
                      insert into course values(@crs_name,@total_hours,@topic_id);
                      END;
                  `);
        resolve({
          success: true,
          data: 'insert procedure went well',
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
                  function: '${DBProcedureDictionary.insertCourse}'
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
