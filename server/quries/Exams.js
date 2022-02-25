const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

const {
  selectAllExamsProc,
  insertExamProc,
  updateExamProc,
  deleteExamProc,
  generatePracticalExamQuestionsProc,
} = require('../procedures/Exams');

/**
 * ^ this Module should generate [SELECT ALL Exams],
 * ^ [insert any Exam],
 * ^ [update any record by id],
 * ^ [delete by id]
 */

module.exports.selectAllExams = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await selectAllExamsProc();
        const records = await MSSQLConnection.pool
          .request()
          .execute(
            DBProcedureDictionary.selectAllExams,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:'selectAllExamProcedure'
                   }`);
                return;
              }
              resolve(records.recordset);
            }
          );
      } catch (err) {
        reject(`{
                    error : ${err},
                    object : dbPoolConnection,
                    function:'selectAllExamProcedure'
                }`);
      }
    } else {
      reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:'selectAllExamProcedure'
          }`);
    }
  });
};

module.exports.insertExam = async function (
  exam_name,
  duration,
  total_marks,
  instructor_id
) {
  let exam_name_checked = typeof exam_name === 'string' ? exam_name : null;
  let duration_checked = typeof duration === 'number' ? duration : null;
  let total_marks_checked =
    typeof total_marks === 'number' ? total_marks : null;
  let instructor_id_checked =
    typeof instructor_id === 'string' ? instructor_id : null;

  if (
    exam_name_checked === null ||
    duration_checked === null ||
    total_marks_checked === null ||
    instructor_id_checked === null
  ) {
    throw `Error with Exam name or duration or total marks or instructor ID params type`;
  }
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await insertExamProc();
        const records = await MSSQLConnection.pool
          .request()
          .input('exam_name', exam_name)
          .input('duration', duration)
          .input('total_marks', total_marks)
          .input('instructor_id', instructor_id)
          .execute(
            DBProcedureDictionary.insertExam,
            (err, records, returnValue) => {
              if (err) {
                console.log('1');
                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:'selectAllExamProcedure'
                   }`);
                return;
              }
              resolve(records.rowsAffected);
            }
          );
      } catch (err) {
        console.log(err);
        reject(`{
                    error : ${err},
                    object : dbPoolConnection,
                    function:${DBProcedureDictionary.insertExam}
                }`);
      }
    } else {
      console.log('3');
      reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.insertExam}
          }`);
    }
  });
};

module.exports.updateExam = async function (
  id,
  exam_name,
  duration,
  total_marks,
  instructor_id
) {
  let id_checked = typeof id === 'number' ? id : null;
  let exam_name_checked = typeof exam_name === 'string' ? exam_name : null;
  let duration_checked = typeof duration === 'number' ? duration : null;
  let total_marks_checked =
    typeof total_marks === 'number' ? total_marks : null;
  let instructor_id_checked =
    typeof instructor_id === 'string' ? instructor_id : null;

  if (
    id_checked === null ||
    exam_name_checked === null ||
    duration_checked === null ||
    total_marks_checked === null ||
    instructor_id_checked === null
  ) {
    throw `Error with ID or Exam name or duration or total marks or instructor ID params type`;
  }
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await updateExamProc();
        const records = await MSSQLConnection.pool
          .request()
          .input('id', id)
          .input('exam_name', exam_name)
          .input('duration', duration)
          .input('total_marks', total_marks)
          .input('instructor_id', instructor_id)
          .execute(
            DBProcedureDictionary.updateExamById,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.updateExamById}
                   }`);
                return;
              }
              resolve(records.rowsAffected);
            }
          );
      } catch (err) {
        console.log(err);
        reject(`{
                    error : ${err},
                    object : dbPoolConnection,
                    function:${DBProcedureDictionary.updateExamById}
                }`);
      }
    } else {
      reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.updateExamById}
          }`);
    }
  });
};

module.exports.deleteExam = async function (id) {
  let id_checked = typeof Number.parseInt(id) === 'number' ? id : null;
  if (id_checked === null) {
    throw `Error with ID param type`;
  }
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await deleteExamProc();
        const records = await MSSQLConnection.pool
          .request()
          .input('id', id)
          .execute(
            DBProcedureDictionary.deleteExamById,
            (err, records, returnValue) => {
              if (err) {
                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.deleteExamById}
                   }`);
                return;
              }
              resolve(records.rowsAffected);
            }
          );
      } catch (err) {
        reject(`{
                    error : ${err},
                    object : dbPoolConnection,
                    function:${DBProcedureDictionary.deleteExamById}
                }`);
      }
    } else {
      reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.deleteExamById}
          }`);
    }
  });
};

/**
 * @description this function generate exam questions
 */
module.exports.generatePracticalExamQuestions = async function () {
  return new Promise(async (resolve, reject) => {
    //check for connection
    if (MSSQLConnection.pool.connected) {
      //try to build the procedure
      try {
        await generatePracticalExamQuestionsProc();
        //if its generated well
        await MSSQLConnection.pool
          .request()
          .execute(
            DBProcedureDictionary.generateExamQuestions,
            (err, recordSets, returnvalue) => {
              if (err) {
                reject(err);
                return;
              }
              //else if no error
              resolve(recordSets.recordset);
            }
          );
      } catch (err) {
        reject(err);
      }
    } else {
      reject(
        new Error(
          `connection error while generating the practical exam questions `
        )
      );
    }
  });
};
