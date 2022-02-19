//* provide connection
const sql = require('mssql');

const sqlConfig = {
  user: 'root',
  password: 'root',
  database: 'ExamDB',
  server: 'localhost',
  options: {
    //encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

class DBConnection {
  constructor() {
    this.pool = null;
  }
  /**
   * @desc  this function returns mssql connection pool , this function should be called only once
   * @returns {Promise<sql.ConnectionPool}
   */
  initMSSQLConnection() {
    return new Promise(async (resolve, reject) => {
      try {
        this.pool = await sql.connect(sqlConfig);
        //if all are ok
        resolve(this.pool);
      } catch (error) {
        reject(`{
                error : ${error},
                object: 'error during opening mssql connection ! [POOL]
            }`);
      }
    });
  }
}

module.exports.MSSQLConnection = new DBConnection(); // u will get only and only one instance
