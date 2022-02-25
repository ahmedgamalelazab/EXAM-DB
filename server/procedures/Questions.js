const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');
//TODO fix the queries and force it all to use the table names rather than the hard coded string
//const tableNames = require('../database/tables/tables.js');

module.exports.selectAllQuestionsProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.selectAllQuestions}
                        AS
                        BEGIN
                        SELECT * FROM questions
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
              function:'selectAllQuestionProcedure'
          }`,
      });
    }
  });
};

module.exports.insertQuestionProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.insertQuestion}
                          (
                              @name AS varchar(max),
                              @question_type_id AS varchar(max),
                              @correct_answer AS varchar(max)
                          )
                          AS
                          BEGIN
                          insert into questions values (@name, @question_type_id, @correct_answer);
                          END;
                      `);
        resolve({
          success: true,
          data: 'insert procedure created well',
        });
      } catch (err) {
        console.log(err);
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
                function: ${DBProcedureDictionary.insertQuestion}
            }`,
      });
    }
  });
};

module.exports.updateQuestionProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.updateQuestionById}
                          (
                              @id AS int,
                              @name AS varchar(max),
                              @question_type_id AS varchar(max),
                              @correct_answer AS varchar(max)
                          )
                          AS
                          BEGIN
                          update questions
                          set name = @name, question_type_id = @question_type_id, correct_answer = @correct_answer  
                          where id = @id
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
                function: ${DBProcedureDictionary.updateQuestionById}
            }`,
      });
    }
  });
};

module.exports.deleteQuestionProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.deleteQuestionById}
                          (
                              @id AS int
                          )
                          AS
                          BEGIN
                          delete questions 
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
                function: ${DBProcedureDictionary.deleteQuestionById}
            }`,
      });
    }
  });
};
