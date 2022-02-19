const {
    DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
    MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

const {
    selectAllQuestionsProc,
    insertQuestionProc,
    updateQuestionProc,
    deleteQuestionProc
} = require('../procedures/Questions');

/**
 * ^ this Module should generate [SELECT ALL questions],
 * ^ [insert any questions],
 * ^ [update any record by id],
 * ^ [delete by id]
 */



module.exports.selectAllQuestions = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await selectAllQuestionsProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .execute(
                        DBProcedureDictionary.selectAllQuestions,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:'selectAllQuestionProcedure'
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
                    function:'selectAllQuestionProcedure'
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:'selectAllQuestionProcedure'
          }`);
        }
    });
};


module.exports.insertQuestion = async function (name, question_type_id, correct_answer) {
    let name_checked = typeof name === 'string' ? name : null;
    let question_type_checked = typeof question_type_id === 'string' ? question_type_id : null;
    let correct_answer_checked = typeof correct_answer === 'string' ? correct_answer : null;

    if (name_checked === null || question_type_checked === null || correct_answer_checked === null) {
        throw `Error with name or question type or correct answer params type`;
    }
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await insertQuestionProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('name', name)
                    .input('question_type_id', question_type_id)
                    .input('correct_answer', correct_answer)
                    .execute(
                        DBProcedureDictionary.insertQuestion,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:'selectAllQuestionProcedure'
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
                    function:${DBProcedureDictionary.insertQuestion}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.insertQuestion}
          }`);
        }
    });
};


module.exports.updateQuestion = async function (id, name, question_type_id, correct_answer) {
    let id_checked = typeof id === 'number' ? id : null;
    let name_checked = typeof name === 'string' ? name : null;
    let question_type_checked = typeof question_type_id === 'string' ? question_type_id : null;
    let correct_answer_checked = typeof correct_answer === 'string' ? correct_answer : null;

    if (id_checked === null || name_checked === null || question_type_checked === null || correct_answer_checked === null) {
        throw `Error with ID or name or question type or correct answer params type`;
    }
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await updateQuestionProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('id', id)
                    .input('name', name)
                    .input('question_type_id', question_type_id)
                    .input('correct_answer', correct_answer)
                    .execute(
                        DBProcedureDictionary.updateQuestionById,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.updateQuestionById}
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
                    function:${DBProcedureDictionary.updateQuestionById}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.updateQuestionById}
          }`);
        }
    });
};


module.exports.deleteQuestion = async function (id) {
    let id_checked = typeof Number.parseInt(id) === 'number' ? id : null;
    if (id_checked === null) {
        throw `Error with ID param type`;
    }
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await deleteQuestionProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('id', id)
                    .execute(
                        DBProcedureDictionary.deleteQuestionById,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.deleteQuestionById}
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
                    function:${DBProcedureDictionary.deleteQuestionById}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.deleteQuestionById}
          }`);
        }
    });
};
