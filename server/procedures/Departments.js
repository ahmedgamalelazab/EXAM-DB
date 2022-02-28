const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');
const tableNames = require('../database/tables/tables.js');

module.exports.createSelectAllDepartmentsProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                      CREATE or ALTER PROC ${DBProcedureDictionary.selectAllDepartments}
                      AS
                      BEGIN
                      SELECT * FROM department
                      END;
                  `);
        //if no error
        resolve({
          success: true,
          data: 'create all proc process went well',
        });
      } catch (err) {
        reject({
          success: false,
          error: err,
        });
      }
    } else {
      reject({
        success: false,
        error: `{
            error : 'mssql db is not connected ..',
            object : dbPoolConnection,
            function:'selectAllDepartmentProcedure'
        }`,
      });
    }
  });
};

/**
 * @desc  insert a department record into the department table with department @dept_name AS varchar(max) param
 * @returns {Promise<Object>}
 */
module.exports.insertDepartment = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.insertDepartment}
                        (
                            @dept_name AS varchar(max)
                        )
                        AS
                        BEGIN
                        insert into department values (@dept_name);
                        END;
                    `);
        //if no error
        resolve({
          success: true,
          data: 'insert procedure created well',
        });
      } catch (err) {
        reject({
          success: false,
          error: err,
        });
      }
    } else {
      reject({
        success: false,
        error: `{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function: ${DBProcedureDictionary.insertDepartment}
          }`,
      });
    }
  });
};

/**
 * @desc  required params to insert @dept_id as int
 * @desc  required params to insert @dept_name as varchar(max)
 * @returns {Promise<Object>}
 */
module.exports.updateDepartmentRecordProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.updateDepartmentById}
                        (
                            @dept_id AS int,
                            @dept_name AS varchar(max)
                        )
                        AS
                        BEGIN
                        update department
                        set name = @dept_name
                        where id = @dept_id
                        END;
                    `);
        //if no error
        resolve({
          success: true,
          data: 'update procedure created well',
        });
      } catch (err) {
        reject({
          success: false,
          error: err,
        });
      }
    } else {
      reject({
        success: false,
        error: `{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function: ${DBProcedureDictionary.updateDepartmentById}
          }`,
      });
    }
  });
};

/**
 * @desc required param to delete record @dept_id as int
 * @returns {Promise<Object>}
 */
module.exports.deleteDepartmentRecordProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.deleteDepartmentById}
                        (
                            @dept_id AS int
                        )
                        AS
                        BEGIN
                        delete department 
                        where id = @dept_id
                        END;
                    `);
        //if no error
        resolve({
          success: true,
          data: 'delete procedure created well',
        });
      } catch (err) {
        reject({
          success: false,
          error: err,
        });
      }
    } else {
      reject({
        success: false,
        error: `{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function: ${DBProcedureDictionary.deleteDepartmentById}
          }`,
      });
    }
  });
};

/**
 *
 * @desc  create stored procedure to get all the students registered in specific department
 */
module.exports.getDepartmentStudentsReport = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                CREATE OR ALTER PROC ${DBProcedureDictionary.getDepartmentStudentsById}
                (
                  @dept_id as int
                )
                AS
                BEGIN
                    select
                    ${tableNames.student}.id as "student_id",
                    ${tableNames.mainUser}.first_name as "student_first_name",
                    ${tableNames.mainUser}.last_name as "student_last_name",
                    ${tableNames.mainUser}.email as "student_email",
                    ${tableNames.department}.name as "student_department"
                    from ${tableNames.student} , ${tableNames.mainUser} , ${tableNames.department}
                    where ${tableNames.mainUser}.id = ${tableNames.student}.user_id
                    AND ${tableNames.student}.dept_id = ${tableNames.department}.id
                    AND ${tableNames.student}.dept_id = @dept_id;
                END            
            `);
        //if all are ok
        resolve('proc created');
      } catch (error) {
        console.log(error);
        reject(error);
      }
    } else {
      reject(new Error(`u must be conned with the db before making this proc`));
    }
  });
};
