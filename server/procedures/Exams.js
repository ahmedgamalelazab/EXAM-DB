const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

module.exports.selectAllExamsProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.selectAllExams}
                        AS
                        BEGIN
                        SELECT * FROM exam
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
              function:'selectAllExamProcedure'
          }`,
      });
    }
  });
};

module.exports.insertExamProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.insertExam}
                          (
                              @exam_name AS varchar(max),
                              @duration AS int,
                              @total_marks AS int,
                              @instructor_id AS varchar(max)
                          )
                          AS
                          BEGIN
                          insert into exam 
                          values (@exam_name, @duration, @total_marks, (select @instructor_id from instructor where id = @instructor_id));
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
                function: ${DBProcedureDictionary.insertExam}
            }`,
      });
    }
  });
};

module.exports.updateExamProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.updateExamById}
                          (
                              @id AS int,
                              @exam_name AS varchar(max),
                              @duration AS int,
                              @total_marks AS int,
                              @instructor_id AS varchar(max)
                          )
                          AS
                          BEGIN
                          update exam
                          set exam_name = @exam_name, duration = @duration, 
                              total_marks = @total_marks, instructor_id = @instructor_id
                          where id = @id And Exists(select id from instructor 
                                                    where id = @instructor_id)
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
                function: ${DBProcedureDictionary.updateExamById}
            }`,
      });
    }
  });
};

module.exports.deleteExamProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.deleteExamById}
                          (
                              @id AS int
                          )
                          AS
                          BEGIN
                          delete exam 
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
                function: ${DBProcedureDictionary.deleteExamById}
            }`,
      });
    }
  });
};

//generate practical exam
//generate practical exam for the students
// this procedure is not doing anything except asking for questions answer list
module.exports.generatePracticalExamQuestionsProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        //TODO fix this code later and make it use the tableNames rather than hard coded ones
        await MSSQLConnection.pool.request().query(`
                   CREATE OR ALTER PROC ${DBProcedureDictionary.generateExamQuestions}
                   AS
                   BEGIN
                   SELECT
                   dbo.questions.id,
                   dbo.questions.name , dbo.answers.answer_one ,
                   dbo.answers.answer_two,
                   dbo.answers.answer_three,
                   dbo.answers.answer_four,
                   dbo.questions.correct_answer,
                   dbo.questions.question_point
                   FROM dbo.answers , dbo.questions 
                   WHERE 
                   dbo.answers.question_id = dbo.questions.id 
                   AND 
                   dbo.questions.genByInstructor = 'false' 
                   END
            `);
        //if everything went well
        //then we need to resolve the result
        resolve(`created proc well [generate exam question proc] `);
      } catch (err) {
        reject(err);
      }
    } else {
      reject(
        new Error(
          `error in connection while generating question answers practical exam`
        )
      );
    }
  });
};
