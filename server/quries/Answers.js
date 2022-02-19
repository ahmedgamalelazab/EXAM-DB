const {
    DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
    MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

const {
    selectAllAnswersProc,
    insertAnswerProc,
    updateAnswerProc,
    deleteAnswerProc
} = require('../procedures/Answers');

/**
 * ^ this Module should generate [SELECT ALL Answers],
 * ^ [insert any Answers],
 * ^ [update any record by id],
 * ^ [delete by id]
 */



module.exports.selectAllAnswers = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await selectAllAnswersProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .execute(
                        DBProcedureDictionary.selectAllAnswers,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:'selectAllAnswerProcedure'
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
                    function:'selectAllAnswerProcedure'
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:'selectAllAnswerProcedure'
          }`);
        }
    });
};


module.exports.insertAnswer = async function (answer_one, answer_two, answer_three, answer_four, question_id) {
    let answer_one_checked = typeof answer_one === 'string' ? answer_one : null;
    let answer_two_checked = typeof answer_two === 'string' ? answer_two : null;
    let answer_three_checked = typeof answer_three === 'string' ? answer_three : null;
    let answer_four_checked = typeof answer_four === 'string' ? answer_four : null;
    let question_id_checked = typeof question_id === 'number' ? question_id : null;
    if (answer_one_checked === null || answer_two_checked === null ||
        answer_three_checked === null || answer_four_checked === null ||
        question_id_checked === null) {
        throw `Error with Answers type or question ID params type`;
    }
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await insertAnswerProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('answer_one', answer_one)
                    .input('answer_two', answer_two)
                    .input('answer_three', answer_three)
                    .input('answer_four', answer_four)
                    .input('question_id', question_id)
                    .execute(
                        DBProcedureDictionary.insertAnswer,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:'selectAllAnswerProcedure'
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
                    function:${DBProcedureDictionary.insertAnswer}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.insertAnswer}
          }`);
        }
    });
};


module.exports.updateAnswer = async function (id, answer_one, answer_two, answer_three, answer_four, question_id) {
    let id_checked = typeof id === 'number' ? id : null;
    let answer_one_checked = typeof answer_one === 'string' ? answer_one : null;
    let answer_two_checked = typeof answer_two === 'string' ? answer_two : null;
    let answer_three_checked = typeof answer_three === 'string' ? answer_three : null;
    let answer_four_checked = typeof answer_four === 'string' ? answer_four : null;
    let question_id_checked = typeof question_id === 'number' ? question_id : null;

    if (answer_one_checked === null || answer_two_checked === null ||
        answer_three_checked === null || answer_four_checked === null ||
        question_id_checked === null || id_checked == null) {
        throw `Error with ID or Answers type or question ID params type`;
    }
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await updateAnswerProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('id', id)
                    .input('answer_one', answer_one)
                    .input('answer_two', answer_two)
                    .input('answer_three', answer_three)
                    .input('answer_four', answer_four)
                    .input('question_id', question_id)
                    .execute(
                        DBProcedureDictionary.updateAnswerById,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.updateAnswerById}
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
                    function:${DBProcedureDictionary.updateAnswerById}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.updateAnswerById}
          }`);
        }
    });
};


module.exports.deleteAnswer = async function (id) {
    let id_checked = typeof Number.parseInt(id) === 'number' ? id : null;
    if (id_checked === null) {
        throw `Error with ID param type`;
    }
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await deleteAnswerProc();
                const records = await MSSQLConnection.pool
                    .request()
                    .input('id', id)
                    .execute(
                        DBProcedureDictionary.deleteAnswerById,
                        (err, records, returnValue) => {
                            if (err) {
                                reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.deleteAnswerById}
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
                    function:${DBProcedureDictionary.deleteAnswerById}
                }`);
            }
        } else {
            reject(`{
              error : 'mssql db is not connected ..',
              object : dbPoolConnection,
              function:${DBProcedureDictionary.deleteAnswerById}
          }`);
        }
    });
};
