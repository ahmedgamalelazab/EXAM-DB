const {
    DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
    MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

module.exports.selectAllAnswersProc = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.selectAllAnswers}
                        AS
                        BEGIN
                        SELECT answers.* , name FROM answers, questions
                        where questions.id = answers.question_id
                        END;
                    `);
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
              function:'selectAllAnswerProcedure'
          }`,
            });
        }
    });
};


module.exports.insertAnswerProc = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.insertAnswer}
                          (
                              @answer_one AS varchar(max),
                              @answer_two AS varchar(max),
                              @answer_three AS varchar(max),
                              @answer_four AS varchar(max),
                              @question_id AS int
                          )
                          AS
                          BEGIN
                          insert into answers 
                          values (@answer_one, @answer_two, @answer_three, @answer_four, 
                            (select @question_id from questions where id = @question_id));
                          END;
                      `);
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
                function: ${DBProcedureDictionary.insertAnswer}
            }`,
            });
        }
    });
};


module.exports.updateAnswerProc = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.updateAnswerById}
                          (
                              @id AS int,
                              @answer_one AS varchar(max),
                              @answer_two AS varchar(max),
                              @answer_three AS varchar(max),
                              @answer_four AS varchar(max),
                              @question_id AS int
                          )
                          AS
                          BEGIN
                          update answers
                          set answer_one = @answer_one, answer_two = @answer_two, 
                              answer_three = @answer_three, answer_four = @answer_four,
                              question_id = @question_id
                          where id = @id And Exists(select id from questions 
                                                    where id = @question_id)
                          END;
                      `);
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
                function: ${DBProcedureDictionary.updateAnswerById}
            }`,
            });
        }
    });
};


module.exports.deleteAnswerProc = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.deleteAnswerById}
                          (
                              @id AS int
                          )
                          AS
                          BEGIN
                          delete Answers 
                          where id = @id
                          END;
                      `);
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
                function: ${DBProcedureDictionary.deleteAnswerById}
            }`,
            });
        }
    });
};
