const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

const {
  createSelectAllDepartmentsProc,
  insertDepartment,
  deleteDepartmentRecordProc,
  updateDepartmentRecordProc,
} = require('../procedures/Departments.js');

/**
 * ^ this Module should generate [SELECT ALL departments],
 * ^ [SELECT BY ID],
 * ^ [insert any department],
 * ^ [update any record by id],
 * ^ [delete all],
 * ^ [delete by id]
 */

//dont forget to document

/**
 * @desc  use a stored procedure [selectAllDepartments] to return promise of departments records
 * @returns {sql.IResult<any>.recordset}
 */
module.exports.selectAllDepartments = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await createSelectAllDepartmentsProc();
        //if created
        const records = await MSSQLConnection.pool
          .request()
          .execute(
            DBProcedureDictionary.selectAllDepartments,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
              error : ${err},
              object : dbPoolConnection,
              function:'selectAllDepartmentProcedure'
               }`);
                return;
              }
              //else
              resolve(records.recordset);
            }
          );
      } catch (err) {
        reject(`{
                error : ${err},
                object : dbPoolConnection,
                function:'selectAllDepartmentProcedure'
            }`);
      }
    } else {
      reject(`{
          error : 'mssql db is not connected ..',
          object : dbPoolConnection,
          function:'selectAllDepartmentProcedure'
      }`);
    }
  });
};

/**
 * @desc  use a stored procedure [insertDepartment] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */
module.exports.insertDepartmentRecord = async function (dept_name) {
  let dept_name_checked = typeof dept_name === 'string' ? dept_name : null;

  if (dept_name_checked === null) {
    throw `ERROR WITH DEPT_NAME PARAM TYPE`;
  }
  //else
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await insertDepartment();
        //if created
        const records = await MSSQLConnection.pool
          .request()
          .input('dept_name', dept_name)
          .execute(
            DBProcedureDictionary.insertDepartment,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
              error : ${err},
              object : dbPoolConnection,
              function:'selectAllDepartmentProcedure'
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
                function:${DBProcedureDictionary.insertDepartment}
            }`);
      }
    } else {
      reject(`{
          error : 'mssql db is not connected ..',
          object : dbPoolConnection,
          function:${DBProcedureDictionary.insertDepartment}
      }`);
    }
  });
};

/**
 * @desc  use a stored procedure [update Proc] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */
module.exports.updateDepartment = async function (dept_id, dept_name) {
  console.log(typeof dept_id);
  let dept_name_checked = typeof dept_name === 'string' ? dept_name : null;
  let dept_id_checked = typeof dept_id === 'number' ? dept_id : null;
  if (dept_name_checked === null || dept_id_checked === null) {
    throw `ERROR WITH DEPT_NAME or DEPT_ID PARAM TYPE`;
  }
  //else
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await updateDepartmentRecordProc();
        //if created
        const records = await MSSQLConnection.pool
          .request()
          .input('dept_id', dept_id)
          .input('dept_name', dept_name)
          .execute(
            DBProcedureDictionary.updateDepartmentById,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
              error : ${err},
              object : dbPoolConnection,
              function:${DBProcedureDictionary.updateDepartmentById}
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
                function:${DBProcedureDictionary.updateDepartmentById}
            }`);
      }
    } else {
      reject(`{
          error : 'mssql db is not connected ..',
          object : dbPoolConnection,
          function:${DBProcedureDictionary.updateDepartmentById}
      }`);
    }
  });
};

/**
 * @desc  use a stored procedure [delete Proc] to return promise of rowsAffected
 * @returns {sql.IResult<any>.rowsAffected}
 */
module.exports.deleteDepartment = async function (dept_id) {
  let dept_id_checked =
    typeof Number.parseInt(dept_id) === 'number' ? dept_id : null;
  if (dept_id_checked === null) {
    throw `ERROR WITH DEPT_ID PARAM TYPE`;
  }
  //else
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await deleteDepartmentRecordProc();
        //if created
        const records = await MSSQLConnection.pool
          .request()
          .input('dept_id', dept_id)
          .execute(
            DBProcedureDictionary.deleteDepartmentById,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
              error : ${err},
              object : dbPoolConnection,
              function:${DBProcedureDictionary.deleteDepartmentById}
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
                function:${DBProcedureDictionary.deleteDepartmentById}
            }`);
      }
    } else {
      reject(`{
          error : 'mssql db is not connected ..',
          object : dbPoolConnection,
          function:${DBProcedureDictionary.deleteDepartmentById}
      }`);
    }
  });
};
