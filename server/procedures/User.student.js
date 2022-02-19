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
 * @desc insert student Record in student table using parameter 
 * @params @first_name as varchar(max),
                    @last_name as varchar(max),
                    @email as varchar(max),
                    @password as varchar(max),
                    @phone_number as varchar(max),
                    @dept_id as int   
 * @returns {Promise<Object>}
 */
module.exports.createInsertStudentUserProc = async function () {
  return new Promise(async (resolve, reject) => {
    //check for the connection
    if (MSSQLConnection.pool.connected) {
      try {
        await MSSQLConnection.pool.request().query(`
             CREATE OR ALTER Proc ${DBProcedureDictionary.insertStudentUser}
                (
                    @first_name as varchar(max),
                    @last_name as varchar(max),
                    @email as varchar(max),
                    @password as varchar(max),
                    @phone_number as varchar(max),
                    @ins_id as varchar(max)
                )
                AS
            BEGIN
            BEGIN TRANSACTION user_filling                       
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
                    declare @recentUserInserted uniqueidentifier;
                    SELECT TOP 1 @recentUserInserted = id FROM ${tableNames.mainUser} where email = @email;
                    
                    DECLARE @instructorConvertedUUID uniqueidentifier; 
                    SET @instructorConvertedUUID = CONVERT(uniqueidentifier, @ins_id);

                    declare @department_id as int
                    SELECT TOP 1 @department_id = dept_id FROM ${tableNames.instructor} where id = @instructorConvertedUUID;

                                           
                        INSERT INTO ${tableNames.student}
                        VALUES
                        (
                            NEWID(),
                            @phone_number,                                                        
                            @recentUserInserted,
                            @department_id
                        );

                        --filling the instructor table

                        declare @recentStudentInserted uniqueidentifier;
                        SELECT TOP 1 @recentStudentInserted = id FROM ${tableNames.student} where phone_number = @phone_number;

                        INSERT INTO ${tableNames.instructor_student}
                        VALUES
                        (
                            @recentStudentInserted,
                            @instructorConvertedUUID
                        )
                        
                    --END INSTRUCTOR CODE--
                    COMMIT TRANSACTION user_filling
                END TRY
                BEGIN CATCH
                        ROLLBACK TRANSACTION user_filling
                END CATCH
            END
          `);
        resolve(`
            {
                success:true,
                message:insert student created .
            }
          `);
      } catch (err) {
        console.log(`{
            error : ${err},
            object: createInsertStudentUserProc
        }`); // error here
        reject(err);
      }
    } else {
      console.log(`error MSSQL db is not connected `);
      `{
          error: DB not connected ..
          object : createInsertStudentUserProc
      }`;
      reject(
        new Error(`{
        error: DB not connected ..
        object : createInsertStudentUserProc
        }`)
      );
    }
  });
};

module.exports.getAllStudentProc = async function () {
  return new Promise(async (resolve, reject) => {
    if (MSSQLConnection.pool.connected) {
      //if db is connected
      //to get all the instructors we need to get it from the user table and
      try {
        await MSSQLConnection.pool.request().query(`

                CREATE OR ALTER PROC ${DBProcedureDictionary.getAllStudentsProc}
                AS
                BEGIN
                    SELECT ${tableNames.mainUser}.id as userId,
                    ${tableNames.mainUser}.first_name as userFirstName,
                    ${tableNames.mainUser}.last_name as userLastName,
                    ${tableNames.mainUser}.email as userEmail,                    
                    ${tableNames.student}.id as student_id,
                    ${tableNames.student}.phone_number as student_phone,                                       
                    (select name as departmentName from ${tableNames.department} where id = ${tableNames.student}.dept_id) as department
                    FROM ${tableNames.mainUser}
                    INNER JOIN ${tableNames.student}
                    ON
                    ${tableNames.mainUser}.id = ${tableNames.student}.user_id                    
                END

            `);

        //if all are ok
        resolve('proc created successfully ..');
      } catch (err) {
        console.log(err);
        reject({
          success: false,
          error: err,
          object: 'getAllStudentsProc function',
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

//delete and update will be created after the children tables get finished first
