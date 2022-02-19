const {
    DBProcedureDictionary,
  } = require('../database/dbDictionary/procedureDictionary.js');
  const sql = require('mssql');
  const {
    MSSQLConnection,
  } = require('../database/nativeConnection/dbNativeConnection.js');
  
  //select all
  module.exports.createSelectAllTopicsProc = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await MSSQLConnection.pool.request().query(`
                        CREATE or ALTER PROC ${DBProcedureDictionary.selectAllTopics}
                        AS
                        BEGIN
                        SELECT * FROM topic
                        END;
                    `);
          //if no error
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
              function:'createSelectAllTopicsProc'
          }`,
        });
      }
    });
  };
  
  /**
   * @desc  insert a department record into the topic table with topic @topic_name AS varchar(max) param
   * @returns {Promise<Object>}
   */
  module.exports.insertTopic = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.insertTopic}
                          (
                              @topic_name AS varchar(max)
                          )
                          AS
                          BEGIN
                          insert into topic values (@topic_name);
                          END;
                      `);
          //if no error
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
                function: ${DBProcedureDictionary.insertTopic}
            }`,
        });
      }
    });
  };
  
  /**
   * @desc  required params to insert @topic_id as int
   * @desc  required params to insert @topic_name as varchar(max)
   * @returns {Promise<Object>}
   */
  module.exports.updateTopicRecordProc = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.updateTopicByID}
                          (
                              @topic_id AS int,
                              @topic_name AS varchar(max)
                          )
                          AS
                          BEGIN
                          update topic
                          set name = @topic_name
                          where id = @topic_id
                          END;
                      `);
          //if no error
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
                function: ${DBProcedureDictionary.updateTopicByID}
            }`,
        });
      }
    });
  };
  
  /**
   * @desc required param to delete record @topic_id as int
   * @returns {Promise<Object>}
   */
  module.exports.deleteTopicRecordProc = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await MSSQLConnection.pool.request().query(`
                          CREATE or ALTER PROC ${DBProcedureDictionary.deleteTopicByID}
                          (
                              @topic_id AS int
                          )
                          AS
                          BEGIN
                          delete topic 
                          where id = @topic_id
                          END;
                      `);
          //if no error
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
                function: ${DBProcedureDictionary.deleteTopicByID}
            }`,
        });
      }
    });
  };
  