const {
    DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
    MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

const {
    selectAllStudentExamQuestionsProc,
    insertStudentExamQuestionProc,
    updateStudentExamQuestionProc,
    deleteStudentExamQuestionProc
} = require('../procedures/StudentExamQuestions.js');

/**
 * ^ this Module should generate [SELECT ALL Student Exam Questions],
 * ^ [insert any Student Exam Questions],
 * ^ [update any record by id],
 * ^ [delete by id]
 */


module.exports.selectAllStudentExamQuestions = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await selectAllStudentExamQuestionsProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .execute(
                        DBProcedureDictionary.selectAllStudentExamQuestions,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:'selectAllStudentExamQuestionProcedure'
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
                    function:'selectAllStudentExamQuestionProcedure'
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:'selectAllStudentExamQuestionProcedure'
          }`);
        }
    });
};


module.exports.insertStudentExamQuestion = async function (exam_id, student_id, question_id, answer) {
    let exam_id_checked = typeof exam_id === 'number' ? exam_id : null;
    let question_id_checked = typeof question_id === 'number' ? question_id : null;


    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await insertStudentExamQuestionProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('exam_id', exam_id)
                    .input('student_id', student_id)
                    .input('question_id', question_id)
                    .input('answer', answer)
                    .execute(
                        DBProcedureDictionary.insertStudentExamQuestion,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:'selectAllStudentExamQuestionsProcedure'
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
                    function:${DBProcedureDictionary.insertStudentExamQuestion}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.insertStudentExamQuestion}
          }`);
        }
    });
};


module.exports.updateStudentExamQuestion = async function (id, exam_id, student_id, question_id, answer) {
    let id_checked = typeof id === 'number' ? id : null;
    let exam_id_checked = typeof exam_id === 'number' ? exam_id : null;
    let question_id_checked = typeof question_id === 'number' ? question_id : null;


    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await updateStudentExamQuestionProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('id', id)
                    .input('exam_id', exam_id)
                    .input('student_id', student_id)
                    .input('question_id', question_id)
                    .input('answer', answer)
                    .execute(
                        DBProcedureDictionary.updateStudentExamQuestionById,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.updateStudentExamQuestionById}
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
                    function:${DBProcedureDictionary.updateStudentExamQuestionById}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.updateStudentExamQuestionById}
          }`);
        }
    });
};


module.exports.deleteStudentExamQuestion = async function (id) {
    let id_checked = typeof Number.parseInt(id) === 'number' ? id : null;
    if (id_checked === null) {
        throw `Error with ID param type`;
    }
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await deleteStudentExamQuestionProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('id', id)
                    .execute(
                        DBProcedureDictionary.deleteStudentExamQuestionById,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.deleteStudentExamQuestionById}
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
                    function:${DBProcedureDictionary.deleteStudentExamQuestionById}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.deleteStudentExamQuestionById}
          }`);
        }
    });
};