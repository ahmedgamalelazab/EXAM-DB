const {
    DBProcedureDictionary,
  } = require('../database/dbDictionary/procedureDictionary.js');
  const sql = require('mssql');
  const {
    MSSQLConnection,
  } = require('../database/nativeConnection/dbNativeConnection.js');
  
  const {
 createSelectAllTopicsProc,
 insertTopic,
 updateTopicRecordProc,
 deleteTopicRecordProc
  } = require('../procedures/Topics');
  
  /**
   * ^ this Module should generate [SELECT ALL departments],
   * ^ [SELECT BY ID],
   * ^ [insert any department],
   * ^ [update any record by id],
   * ^ [delete all],
   * ^ [delete by id]
   */
  
  //dont forget to document
  
  /**
   * @desc  use a stored procedure [createSelectAllTopicsProc] to return promise of Topic records
   * @returns {sql.IResult<any>.recordset}
   */
  module.exports.selectAllTopics = async function () {
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await createSelectAllTopicsProc();
          //if created
          const records = await MSSQLConnection.pool
            .request()
            .execute(
              DBProcedureDictionary.selectAllTopics,
              (err, records, returnValue) => {
                if (err) {
                  reject(`{
                error : ${err},
                object : dbPoolConnection,
                function:'selectAllTopicsProcedure'
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
                  function:'selectAllTopicsProcedure'
              }`);
        }
      } else {
        reject(`{
            error : 'mssql db is not connected ..',
            object : dbPoolConnection,
            function:'selectAllTopicsProcedure'
        }`);
      }
    });
  };
  
  /**
   * @desc  use a stored procedure [insertTopic] to return promise of rowsAffected
   * @returns {sql.IResult<any>.rowsAffected}
   */
  module.exports.insertTopicsRecord = async function (topic_name) {
    let topic_name_checked = typeof topic_name === 'string' ? topic_name : null;
  
    if (topic_name_checked === null) {
      throw `ERROR WITH topic_name PARAM TYPE`;
    }
    //else
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await insertTopic();
          //if created
          const records = await MSSQLConnection.pool
            .request()
            .input('topic_name', topic_name)
            .execute(
              DBProcedureDictionary.insertTopic,
              (err, records, returnValue) => {
                if (err) {
                  reject(`{
                error : ${err},
                object : dbPoolConnection,
                function:'insertTopicsRecord'
                 }`);
                  return;
                }
                //else
                resolve(records.rowsAffected);
              }
            );
        } catch (err) {
          reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.insertTopic}
              }`);
        }
      } else {
        reject(`{
            error : 'mssql db is not connected ..',
            object : dbPoolConnection,
            function:${DBProcedureDictionary.insertTopic}
        }`);
      }
    });
  };
  
  /**
   * @desc  use a stored procedure [updateTopicRecordProc] to return promise of rowsAffected
   * @returns {sql.IResult<any>.rowsAffected}
   */
  module.exports.updateTopic = async function (topic_id, topic_name) {
    // console.log(typeof topic_id);
    let topic_name_checked = typeof topic_name === 'string' ? topic_name : null;
    let topic_id_checked = typeof topic_id === 'number' ? topic_id : null;
    if (topic_name_checked === null || topic_id_checked === null) {
      throw `ERROR WITH topic_name or topic_id PARAM TYPE`;
    }
    //else
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await updateTopicRecordProc();
          //if created
          const records = await MSSQLConnection.pool
            .request()
            .input('topic_id', topic_id)
            .input('topic_name', topic_name)
            .execute(
              DBProcedureDictionary.updateTopicByID,
              (err, records, returnValue) => {
                if (err) {
                  reject(`{
                error : ${err},
                object : dbPoolConnection,
                function:${DBProcedureDictionary.updateTopicByID}
                 }`);
                  return;
                }
                //else
                resolve(records.rowsAffected);
              }
            );
        } catch (err) {
          reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${DBProcedureDictionary.updateTopicByID}
              }`);
        }
      } else {
        reject(`{
            error : 'mssql db is not connected ..',
            object : dbPoolConnection,
            function:${DBProcedureDictionary.updateTopicByID}
        }`);
      }
    });
  };
  
  /**
   * @desc  use a stored procedure [delete Proc] to return promise of rowsAffected
   * @returns {sql.IResult<any>.rowsAffected}
   */
  module.exports.deleteTopic = async function (topic_id) {
    let topic_id_checked =
      typeof Number.parseInt(topic_id) === 'number' ? topic_id : null;
    if (topic_id_checked === null) {
      throw `ERROR WITH topic_id PARAM TYPE`;
    }
    //else
    return new Promise(async (resolve, reject) => {
      if (MSSQLConnection.pool.connected) {
        try {
          await deleteTopicRecordProc();
          //if created
          const records = await MSSQLConnection.pool
            .request()
            .input('topic_id', topic_id)
            .execute(
              DBProcedureDictionary.deleteTopicByID,
              (err, records, returnValue) => {
                if (err) {
                  reject(`{
                error : ${err},
                object : dbPoolConnection,
                function:${ DBProcedureDictionary.deleteTopicByID}
                 }`);
                  return;
                }
                //else
                resolve(records.rowsAffected);
              }
            );
        } catch (err) {
          reject(`{
                  error : ${err},
                  object : dbPoolConnection,
                  function:${ DBProcedureDictionary.deleteTopicByID}
              }`);
        }
      } else {
        reject(`{
            error : 'mssql db is not connected ..',
            object : dbPoolConnection,
            function:${ DBProcedureDictionary.deleteTopicByID}
        }`);
      }
    });
  };
  