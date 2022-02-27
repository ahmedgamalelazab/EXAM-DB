const { GenericError } = require('../utils/GenericError.js');

const tableNames = require('../database/tables/tables.js');
const {
  DBProcedureDictionary,
} = require('../database/dbDictionary/procedureDictionary.js');
const sql = require('mssql');
const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');

//insert user-instructor
/**
 * @desc insert Instructor Record in instructor table using parameter 
 * @params @first_name as varchar(max),
                    @last_name as varchar(max),
                    @email as varchar(max),
                    @password as varchar(max),
                    @phone_number as varchar(max),
                    @salary as int,
                    @crs_id as int,
                    @dept_id as int   
 * @returns {Promise<Object>}
 */
module.exports.createInsertInstructorUserProc = async function () {
  return new Promise(async (resolve, reject) => {
    //check for the connection
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
             CREATE OR ALTER Proc ${DBProcedureDictionary.insertInstructorUser}
                (
                    @first_name as varchar(max),
                    @last_name as varchar(max),
                    @email as varchar(max),
                    @password as varchar(max),
                    @phone_number as varchar(max),
                    @salary as int,
                    @crs_id as int,
                    @dept_id as int                    
                )
                AS
                BEGIN
                    BEGIN TRANSACTION fill_user
                        BEGIN TRY
                    -- USER CODE --
                        INSERT INTO ${tableNames.mainUser}
                        VALUES 
                        (
                            NEWID(),
                            @first_name,
                            @last_name,
                            @email,
                            @password
                        );
                    -- END USER CODE --                  
                    -- INSTRUCTOR CODE --
                    declare @recentUserInserted uniqueidentifier
                    SELECT TOP 1 @recentUserInserted = id FROM ${tableNames.mainUser} where email = @email
                        
                        INSERT INTO ${tableNames.instructor}
                        VALUES
                        (
                            NEWID(),
                            @phone_number,
                            @salary,
                            @crs_id,
                            @dept_id,
                            @recentUserInserted
                        );
                        
                    --END INSTRUCTOR CODE--
                    COMMIT TRANSACTION fill_user
                        END TRY
                   BEGIN CATCH
                        ROLLBACK TRANSACTION fill_user
                   END CATCH
                END
          `);
        resolve(`
            {
                success:true,
                message:insert instructor created .
            }
          `);
      } catch (err) {
        console.log(`{
            error : ${err},
            object: createInsertInstructorUserProc
        }`); // error here
        reject(err);
      }
    } else {
      console.log(`error MSSQL db is not connected `);
      `{
          error: DB not connected ..
          object : createInsertInstructorUserProc
      }`;
      reject(
        new Error(`{
        error: DB not connected ..
        object : createInsertInstructorUserProc
        }`)
      );
    }
  });
};

module.exports.getAllInstructorsProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      //if db is connected
      //to get all the instructors we need to get it from the user table and
      try {
        await MSSQLConnection.pool.request().query(`

                CREATE OR ALTER PROC ${DBProcedureDictionary.getAllInstructorsProc}
                AS
                BEGIN
                    SELECT ${tableNames.mainUser}.id as userId,
                    ${tableNames.mainUser}.first_name as userFirstName,
                    ${tableNames.mainUser}.last_name as userLastName,
                    ${tableNames.mainUser}.email as userEmail,                    
                    ${tableNames.instructor}.id as ins_id,
                    ${tableNames.instructor}.phone_number as insPhone,
                    ${tableNames.instructor}.salary as insSalary,
                    (select name as courseName from ${tableNames.course} where id = ${tableNames.instructor}.course_id) as courses,
                    (select name as departmentName from ${tableNames.department} where id = ${tableNames.instructor}.dept_id) as department
                    FROM ${tableNames.mainUser}
                    INNER JOIN ${tableNames.instructor}
                    ON
                    ${tableNames.mainUser}.id = ${tableNames.instructor}.user_id                    
                END

            `);

        //if all are ok
        resolve('proc created successfully ..');
      } catch (err) {
        console.log(err);
        reject({
          success: false,
          error: err,
          object: 'getAllInstructorsProc function',
        });
      }
    } else {
      //db not connected
      reject(
        new Error(`{
        error: DB not connected ..
        object : createInsertInstructorUserProc
        }`)
      );
    }
  });
};

/**
 * @warning make a proc to search with student id if no record then delete him too
 * @description deletes only the instructor from the db
 * @returns
 */
module.exports.deleteInstructorProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      try {
        //lets try to create proc to delete the instructor
        //we will try to do so by deleing the whole user
        await MSSQLConnection.pool.request().query(`
          CREATE OR ALTER PROC ${DBProcedureDictionary.deleteInstructorDictionaryProc}
          (
            @email as varchar(max),
            @ins_id as varchar(max)
          )
          AS
          BEGIN
            BEGIN TRY
              BEGIN TRANSACTION deleteIns
             
              DECLARE @instructorConvertedUUID uniqueidentifier; 
              SET @instructorConvertedUUID = CONVERT(uniqueidentifier, @ins_id);

                delete from ${tableNames.instructor_student} where instructor_id = @instructorConvertedUUID;
                delete from ${tableNames.mainUser} where email = @email;
              COMMIT TRANSACTION deleteIns
            END TRY
            BEGIN CATCH
              ROLLBACK TRANSACTION deleteIns
            END CATCH
          END
        `);
        //if all are ok
        resolve('created delete instructor ..');
      } catch (err) {
        console.log(err);
        reject(
          new GenericError()
            .object_error_occur(err)
            .message_content('error while creating the procedure')
            .function_error_occur('deleteInstructorProc')
            .success_state(false)
            .build()
        );
      }
    } else {
      throw `db not connected ..`;
    }
  });
};

module.exports.getInstructorStudentsProc = async function () {
  return new Promise(async (resolve, reject) => {
    //check for the internet connection
    if (MSSQLConnection.pool.connected) {
      //if connected ?
      //then create the query proc
      try {
        await MSSQLConnection.pool.request().query(`
            CREATE OR ALTER PROC ${DBProcedureDictionary.getInstructorStudentProc}
            (
              @ins_id as varchar(max)
            )
            AS
            BEGIN
                SELECT 
                ${tableNames.student}.id as "student_id",
                ${tableNames.mainUser}.first_name as "student_first_name",
                ${tableNames.mainUser}.last_name as "student_last_name",
                ${tableNames.mainUser}.email as "student_email",
                ${tableNames.mainUser}.password
                FROM ${tableNames.student} , ${tableNames.instructor_student} , ${tableNames.instructor} , ${tableNames.mainUser}
                WHERE ${tableNames.student}.id = ${tableNames.instructor_student}.student_id
                AND ${tableNames.instructor}.id = ${tableNames.instructor_student}.instructor_id
                AND ${tableNames.student}.user_id = ${tableNames.mainUser}.id   
                AND ${tableNames.instructor}.id = @ins_id
            END
        `);

        //if all are ok
        resolve(`proc created`);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    } else {
      reject(
        new Error(
          `u must connect to the data base before creating or altering the proc`
        )
      );
    }
  });
};
