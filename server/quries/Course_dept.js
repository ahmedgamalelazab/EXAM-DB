const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');
const {
  CreateSelectAllCourse_deptProc,
  CreateInsertCourse_deptProc,
  CreateUpdateCourse_deptProc,
  CreateDeleteCourse_deptProc
 } = require('../procedures/Course_dept');


////////////////////////////////////////////////////////////
///////******************Select ******************//////////


/**
 * @description use a stored procedure [selectAllCoursesDept] to return promise of courses records
 * @returns {sql.IResult<any>.recordset}
 */

module.exports.selectAllCourses_dept = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await CreateSelectAllCourse_deptProc();
        const records = await MSSQLConnection.pool
          .request()
          .execute(
            DBProcedureDictionary.selectAllCoursesDept,
            (error, records, returnValues) => {
              if (error) {
                reject(`{
                error: ${error},
                object: dbPoolConnection,
                function:'selectAllCourses_dept'
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
                      function:'selectAllCourses_dept'
                  }`);
      } //end of catch
    } //end of if
    else {
      reject(`{
                  error: 'mssql bd is not connected..',
                  object: dbPoolConnection,
                  function:'selectAllCourses_dept'
              }`);
    }
  }); //end of promise
}; //end of exports



////////////////////////////////////////////////////////////
///////******************Insert ******************//////////

/**
 * @desc  use a stored procedure [insertCourseDept] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */

 module.exports.insertCourse_dept = async function (crs_id,dept_id) {
  let crs_id_checked = typeof crs_id === 'number' ? crs_id : null;
  let dept_id_checked = typeof dept_id === 'number' ? dept_id : null;
  console.log(typeof crs_id);
  console.log(typeof dept_id);
  if (crs_id_checked === null ||dept_id_checked === null){
    throw `ERROR WITH ERROR WITH  CRS_ID PARAM TYPE OR DEPT_ID PARAM TYPE `;
  }
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await CreateInsertCourse_deptProc();
        const records = await MSSQLConnection.pool
          .request()
          .input('crs_id',crs_id)
          .input('dept_id',dept_id)
          .execute(
            DBProcedureDictionary.insertCourseDept,
            (error, records, returnValues) => {
              if (error) {
                reject(`{
                error: ${error},
                object: dbPoolConnection,
                function:${DBProcedureDictionary.insertCourseDept}
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
                      function:'insertCourseDept'
                  }`);
      } //end of catch
    } //end of if
    else {
      reject(`{
                  error: 'mssql bd is not connected..',
                  object: dbPoolConnection,
                  function:'insertCourseDept'
              }`);
    }
  }); //end of promise
}; //end of exports



////////////////////////////////////////////////////////////
///////******************Update ******************//////////

/**
 * @desc  use a stored procedure [updateCourseByID] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */
 module.exports.updateCourse_dept = async function (crs_dept_id ,crs_id,dept_id) {
  let crs_dept_id_checked = typeof crs_dept_id === 'number' ? crs_dept_id : null;
  let crs_id_checked = typeof crs_id === 'number' ? crs_id : null;
  let dept_id_checked = typeof dept_id === 'number' ? dept_id : null;
   // console.log(typeof crs_total_hours);
  // console.log(typeof crs_topic_id);
  if (crs_id_checked===null ||crs_dept_id_checked === null ||dept_id_checked === null){
    throw `ERROR WITH ERROR WITH  crs_dept_id PARAM TYPE OR dept_id PARAM TYPE OR CRS_ID`;
  }
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await CreateUpdateCourse_deptProc();
        const records = await MSSQLConnection.pool
          .request()
          .input('crs_dept_id',crs_dept_id)
          .input('crs_id',crs_id)
          .input('dept_id',dept_id)
          .execute(
            DBProcedureDictionary.updateCourseDeptByID,
            (error, records, returnValues) => {
              if (error) {
                reject(`{
                error: ${error},
                object: dbPoolConnection,
                function:${DBProcedureDictionary.updateCourseDeptByID}
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
                      function:'updateCourse_dept'
                  }`);
      } //end of catch
    } //end of if
    else {
      reject(`{
                  error: 'mssql bd is not connected..',
                  object: dbPoolConnection,
                  function:'updateCourse_dept'
              }`);
    }
  }); //end of promise
}; //end of exports

////////////////////////////////////////////////////////////
///////***Delete ******************/////////////////////////

/**
 * @desc  use a stored procedure [deleteCourseDeptByID] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */
 module.exports.deleteCourse_dept = async function (crs_dept_id) {
  let crs_dept_id_checked = typeof Number.parseInt(crs_dept_id) === 'number' ? crs_dept_id : null;
  // console.log(typeof Number.parseInt(crs_id));
  if (crs_dept_id_checked === null) {
    throw `ERROR WITH CRS_dept_ID PARAM TYPE`;
  }
  //else
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await CreateDeleteCourse_deptProc();
        //if created
        const records = await MSSQLConnection.pool
          .request()
          .input('crs_dept_id', crs_dept_id)
          .execute(
            DBProcedureDictionary.deleteCourseDeptByID,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
              error : ${err},
              object : dbPoolConnection,
              function:${DBProcedureDictionary.deleteCourseDeptByID}
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
                function:${DBProcedureDictionary.deleteCourseDeptByID}
            }`);
      }
    } else {
      reject(`{
          error : 'mssql db is not connected ..',
          object : dbPoolConnection,
          function:${DBProcedureDictionary.deleteCourseDeptByID}
      }`);
    }
  });
};
