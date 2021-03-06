const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');
const {
  CreateSelectAllCoursesProc,
  CreateInsertCourseProc,
  CreateUpdateCourseProc,
  CreateDeleteCourseProc } = require('../procedures/Courses.js');

/**
 * @description use a stored procedure [selectAllCourses] to return promise of courses records
 * @returns {sql.IResult<any>.recordset}
 */

module.exports.selectAllCourses = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await CreateSelectAllCoursesProc();
        const records = await MSSQLConnection.pool
          .request()
          .execute(
            DBProcedureDictionary.selectAllCourses,
            (error, records, returnValues) => {
              if (error) {
                reject(`{
                error: ${error},
                object: dbPoolConnection,
                function:'selectAllCourses'
            }`);
                return;
              } //if error
              else resolve(records.recordset);
            }
          );
      } catch (error) {
        reject(`{
                      error: ${error},
                      object: dbPoolConnection,
                      function:'selectAllCourses'
                  }`);
      } //end of catch
    } //end of if
    else {
      reject(`{
                  error: 'mssql bd is not connected..',
                  object: dbPoolConnection,
                  function:'selectAllCourses'
              }`);
    }
  }); //end of promise
}; //end of exports



/**
 * @desc  use a stored procedure [insertCourses] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */
 module.exports.insertCourses = async function (crs_name,crs_total_hours,crs_topic_id) {
  let crs_name_checked = typeof crs_name === 'string' ? crs_name : null;
  let total_hours_checked = typeof crs_total_hours === 'number' ? crs_total_hours : null;
  let crs_topic_id_checked = typeof crs_topic_id === 'number' ? crs_topic_id : null;
  console.log(typeof crs_total_hours);
  console.log(typeof crs_topic_id);
  if (crs_name_checked === null ||total_hours_checked === null || crs_topic_id_checked === null){
    throw `ERROR WITH ERROR WITH  CRS_NAME PARAM TYPE OR TOTAL_HOURS PARAM TYPE OR TOPIC_ID `;
  }
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await CreateInsertCourseProc();
        const records = await MSSQLConnection.pool
          .request()
          .input('crs_name',crs_name)
          .input('crs_total_hours',crs_total_hours)
          .input('crs_topic_id',crs_topic_id)
          .execute(
            DBProcedureDictionary.insertCourse,
            (error, records, returnValues) => {
              if (error) {
                reject(`{
                error: ${error},
                object: dbPoolConnection,
                function:${DBProcedureDictionary.insertCourse}
            }`);
                return;
              } //if error
            resolve(records.rowsAffected);
            }
          );
      } catch (error) {
        reject(`{
                      error: ${error},
                      object: dbPoolConnection,
                      function:'insertCourse'
                  }`);
      } //end of catch
    } //end of if
    else {
      reject(`{
                  error: 'mssql bd is not connected..',
                  object: dbPoolConnection,
                  function:'insertCourse'
              }`);
    }
  }); //end of promise
}; //end of exports



/**
 * @desc  use a stored procedure [updateCourseByID] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */
 module.exports.updateCourses = async function (crs_id ,crs_name,crs_total_hours,crs_topic_id) {
  let crs_id_checked = typeof crs_id === 'number' ? crs_id : null;
  let crs_name_checked = typeof crs_name === 'string' ? crs_name : null;
  let total_hours_checked = typeof crs_total_hours === 'number' ? crs_total_hours : null;
  let crs_topic_id_checked = typeof crs_topic_id === 'number' ? crs_topic_id : null;
  // console.log(typeof crs_total_hours);
  // console.log(typeof crs_topic_id);
  if (crs_id_checked===null ||crs_name_checked === null ||total_hours_checked === null || crs_topic_id_checked === null  ){
    throw `ERROR WITH ERROR WITH  CRS_NAME PARAM TYPE OR TOTAL_HOURS PARAM TYPE OR TOPIC_ID OR CRS_ID`;
  }
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await CreateUpdateCourseProc();
        const records = await MSSQLConnection.pool
          .request()
          .input('crs_id',crs_id)
          .input('crs_name',crs_name)
          .input('crs_total_hours',crs_total_hours)
          .input('crs_topic_id',crs_topic_id)
          .execute(
            DBProcedureDictionary.updateCourseByID,
            (error, records, returnValues) => {
              if (error) {
                reject(`{
                error: ${error},
                object: dbPoolConnection,
                function:${DBProcedureDictionary.updateCourseByID}
            }`);
                return;
              } //if error
            resolve(records.rowsAffected);
            }
          );
      } catch (error) {
        reject(`{
                      error: ${error},
                      object: dbPoolConnection,
                      function:'updateCourses'
                  }`);
      } //end of catch
    } //end of if
    else {
      reject(`{
                  error: 'mssql bd is not connected..',
                  object: dbPoolConnection,
                  function:'updateCourses'
              }`);
    }
  }); //end of promise
}; //end of exports


/**
 * @desc  use a stored procedure [CreateDeleteCourseProc] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */
 module.exports.deleteCourse = async function (crs_id) {
  let crs_id_checked = typeof Number.parseInt(crs_id) === 'number' ? crs_id : null;
  // console.log(typeof Number.parseInt(crs_id));
  if (crs_id_checked === null) {
    throw `ERROR WITH CRS_ID PARAM TYPE`;
  }
  //else
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await CreateDeleteCourseProc();
        //if created
        const records = await MSSQLConnection.pool
          .request()
          .input('crs_id', crs_id)
          .execute(
            DBProcedureDictionary.deleteCourseByID,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
              error : ${err},
              object : dbPoolConnection,
              function:${DBProcedureDictionary.deleteCourseByID}
               }`);
                return;
              }
              //else
              resolve(records.rowsAffected);
            }
          );
      } catch (err) {
        reject(`{
                error : ${err},
                object : dbPoolConnection,
                function:${DBProcedureDictionary.deleteCourseByID}
            }`);
      }
    } else {
      reject(`{
          error : 'mssql db is not connected ..',
          object : dbPoolConnection,
          function:${DBProcedureDictionary.deleteCourseByID}
      }`);
    }
  });
};
