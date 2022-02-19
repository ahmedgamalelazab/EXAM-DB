const {
    DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
    MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

module.exports.selectAllStudentExamQuestionsProc = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.selectAllStudentExamQuestions}
                        AS
                        BEGIN
                        SELECT * FROM student_exam_question
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
              function:'selectAllStudentExamQuestionProcedure'
          }`,
            });
        }
    });
};


module.exports.insertStudentExamQuestionProc = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.insertStudentExamQuestion}
                          (
                              
                              @exam_id AS int,
                              @student_id AS varchar(max) = null,
                              @question_id AS int,
                              @answer AS varchar(max) = null
                          )
                          AS
                          BEGIN
                          insert into student_exam_question 
                          values((select @exam_id from exam where id = @exam_id), 
                                 (select @student_id from student where id = @student_id), 
                                 (select @question_id from questions where id = @question_id), 
                                 @answer);
                          
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
                function: ${DBProcedureDictionary.insertStudentExamQuestion}
            }`,
            });
        }
    });
};


module.exports.updateStudentExamQuestionProc = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.updateStudentExamQuestionById}
                          (
                              @id AS int,
                              @exam_id AS int,
                              @student_id AS varchar(max),
                              @question_id AS int,
                              @answer AS varchar(max)
                          )
                          AS
                          BEGIN
                          update student_exam_question
                          set exam_id = @exam_id, student_id = @student_id, 
                              question_id = @question_id, answer = @answer
                          where id = @id And Exists(select id from exam 
                                                    where id = @exam_id)
                                        And  Exists(select id from student 
                                                    where id = @student_id)
                                        And  Exists(select id from questions 
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
                function: ${DBProcedureDictionary.updateStudentExamQuestionById}
            }`,
            });
        }
    });
};


module.exports.deleteStudentExamQuestionProc = async function () {
    return new Promise(async (resolve, reject) => {
        if (MSSQLConnection.pool.connected) {
            try {
                await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.deleteStudentExamQuestionById}
                          (
                              @id AS int
                          )
                          AS
                          BEGIN
                          delete student_exam_question 
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
                function: ${DBProcedureDictionary.deleteStudentExamQuestionById}
            }`,
            });
        }
    });
};
