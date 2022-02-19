const { GenericError } = require('../utils/GenericError.js');
//every thing related to instructor
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');
const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const {
  createInsertStudentUserProc,
  getAllStudentProc,
} = require('../procedures/User.student.js');

/**
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} email
 * @param {string} password
 * @param {string} phone_number
 * @param {number} ins_id
 * @desc  use a stored procedure [insert student] to return promise of rowsAffected
 *
 * @returns {sql.IResult<any>.rowsAffected}
 */
module.exports.insertStudentRecord = async function (
  first_name,
  last_name,
  email,
  password,
  phone_number,
  ins_id
) {
  let first_name_checked = typeof first_name === 'string' ? first_name : null;
  let last_name_checked = typeof last_name === 'string' ? last_name : null;
  let email_checked = typeof email === 'string' ? email : null;
  let password_checked = typeof password === 'string' ? password : null;
  let phone_number_checked =
    typeof phone_number === 'string' ? phone_number : null;
  let checked_ins_id = typeof ins_id === 'string' ? ins_id : null;

  if (
    email_checked === null ||
    first_name_checked === null ||
    last_name_checked === null ||
    password_checked === null ||
    phone_number_checked === null ||
    checked_ins_id === null
  ) {
    throw `ERROR WITH DEPT_NAME PARAM TYPE`;
  } else {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await createInsertStudentUserProc();
          //if created
          const records = await MSSQLConnection.pool
            .request()
            .input('first_name', first_name)
            .input('last_name', last_name)
            .input('email', email)
            .input('password', password)
            .input('phone_number', phone_number)
            .input('ins_id', ins_id)
            .execute(
              DBProcedureDictionary.insertStudentUser,
              (err, records, returnValue) => {
                if (err) {
                  reject(`{
              error : ${err},
              object : dbPoolConnection,
              function:insertStudentRecord
               }`);
                  return;
                }
                //else
                resolve(records.rowsAffected);
              }
            );
        } catch (err) {
          console.log(err);
          reject(`{
                error : ${err},
                object : dbPoolConnection,
                function:${DBProcedureDictionary.insertStudentUser}
            }`);
        }
      } else {
        reject(`{
          error : 'mssql db is not connected ..',
          object : dbPoolConnection,
          function:${DBProcedureDictionary.insertStudentUser}
      }`);
      }
    });
  }
};

/**
 * @desc return all students records
 * @returns {import('mssql').IRecordSet<any>.recordset}
 */
module.exports.getAllStudentsUserRecords = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await getAllStudentProc(); //create or alter proc

        //if all are ok
        await MSSQLConnection.pool
          .request()
          .execute(
            DBProcedureDictionary.getAllStudentsProc,
            (err, records, retValue) => {
              if (err) {
                reject(
                  new GenericError()
                    .success_state(false)
                    .message_content(`error while getting all the students`)
                    .function_error_occur('getAllStudentsUserRecords')
                    .object_error_occur(err)
                    .build()
                );
                return;
              }
              //else
              resolve(records.recordset);
            }
          );
      } catch (err) {
        console.log(err);
        reject(
          new GenericError()
            .success_state(false)
            .message_content(
              `error while using the procedure or while creating the procedure`
            )
            .function_error_occur('getAllStudentsUserRecords')
            .object_error_occur(err)
            .build()
        );
      }
    } else {
      //db not connected then throw error
      throw `db not connected .. function : getAllStudentsRecord`;
    }
  });
};
