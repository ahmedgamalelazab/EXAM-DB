const {
    DBProcedureDictionary,
  } = require('../database/dbDictionary/procedureDictionary.js');
  const sql = require('mssql');
  const {
    MSSQLConnection,
  } = require('../database/nativeConnection/dbNativeConnection.js');
  
  module.exports.CreateSelectAllCourse_deptProc = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.selectAllCoursesDept}
                        AS
                        BEGIN
                        SELECT  course_dept.id ,course.name as courseName, department.name as departmentName FROM course, department,course_dept
                        where course.id = course_dept.crs_id and course_dept.dept_id =department.id
                        END;
                    `);
          resolve({
            success: true,
            data: 'CreateSelectAllCourseProc went well',
          });
        } catch (error) {
          // end of try
          reject({
            success: false,
            error: error,
          });
        } //end of catch
      } //end of if
      else {
        reject({
          success: false,
          error: `{
                    error : 'mssql db is not connected ..',
                    object : dbPoolConnection,
                    function:'CreateSelectAllCourseProc'
                }`,
        });
      }
    }); //end of promise
  }; //end of exports
  



  /**
   * @desc  insert a course record into the course_dept table with course id  @crs_id AS int
   * @returns {Promise<Object>}
   */
  
  module.exports.CreateInsertCourse_deptProc = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.insertCourseDept}
                        (
  
                          @crs_id AS int,
                          @dept_id AS int
                        )
                        AS
                        BEGIN
                        insert into course_dept values(@crs_id,@dept_id);
                        END;
                    `);
          resolve({
            success: true,
            data: 'insert procedure went well',
          });
        } catch (error) {
          // end of try
          console.log(error);
          reject({
            success: false,
            error: error,
          });
        } //end of catch
      } //end of if
      else {
        reject({
          success: false,
          error: `{
                    error : 'mssql db is not connected ..',
                    object : dbPoolConnection,
                    function: ${DBProcedureDictionary.insertCourseDept}
                }`,
        });
      }
    }); //end of promise
  }; //end of exports
  
  
  
  
  /**
   * @desc required params to insert @crs_dept_id as int
   * @desc required params to insert  @crs_id AS int , @dept_id AS int
   * @returns {Promise<Object>}
   */
  module.exports.CreateUpdateCourse_deptProc = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.updateCourseDeptByID}
                        (
                          @crs_dept_id AS int,
                          @crs_id AS int,
                          @dept_id AS int
                        )
                        AS
                        BEGIN
                        update course_dept
                        set crs_id = @crs_id , dept_id = @dept_id 
                        where id = @crs_dept_id
                        END;
                    `);
          resolve({
            success: true,
            data: 'update procedure went well',
          });
        } catch (error) {
          // end of try
          console.log(error);
          reject({
            success: false,
            error: error,
          });
        } //end of catch
      } //end of if
      else {
        reject({
          success: false,
          error: `{
                    error : 'mssql db is not connected ..',
                    object : dbPoolConnection,
                    function: ${DBProcedureDictionary.updateCourseDeptByID}
                }`,
        });
      }
    }); //end of promise
  }; //end of exports
  
  
  
  /**
   * @desc required param to delete record @crs_dept_id as int
   * @returns {Promise<Object>}
   */
  module.exports.CreateDeleteCourse_deptProc = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.deleteCourseDeptByID}
                        (
                          @crs_dept_id AS int
                        )
                        AS
                        BEGIN
                        delete course_dept
                        where id = @crs_dept_id
                        END;
                    `);
          resolve({
            success: true,
            data: 'Course_dept is deleted',
          });
        } catch (error) {
          // end of try
          // console.log(error);
          reject({
            success: false,
            error: error,
          });
        } //end of catch
      } //end of if
      else {
        reject({
          success: false,
          error: `{
                    error : 'mssql db is not connected ..',
                    object : dbPoolConnection,
                    function: ${DBProcedureDictionary.deleteCourseDeptByID}
                }`,
        });
      }
    }); //end of promise
  }; //end of exports