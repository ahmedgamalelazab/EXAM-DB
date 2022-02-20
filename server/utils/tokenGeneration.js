const jwt = require('jsonwebtoken');

/**
 * @description the payload should come as a db result and this function will get this obj from stored procedure
 * @param {Object} payload
 */
module.exports.generateToken = async function (payload, userType) {
  return new Promise(async (resolve, reject) => {
    if (payload) {
      if (Array.isArray(payload)) {
        if (payload.length === 0) {
          reject(new Error('something wrong with db result !'));
          return;
        }

        //^build jwt based on payload of db obj result
        let token = undefined;
        console.log(payload);
        switch (userType) {
          case 'admin':
            token = jwt.sign(payload[0], process.env.ADMIN_SECRET_KEY);
            resolve(token);
            break;
          case 'instructor':
            token = jwt.sign(payload[0], process.env.INSTRUCTOR_SECRET_KEY);
            resolve(token);
            break;
          case 'student':
            token = jwt.sign(payload[0], process.env.STUDENT_SECRET_KEY);
            resolve(token);
            break;
          default:
            reject(new Error('unknown userType'));
            break;
        }
      }

      //^build jwt based on payload anything else but array
      let token = null;
      switch (userType) {
        case 'admin':
          token = jwt.sign(payload, process.env.ADMIN_SECRET_KEY);
          resolve(token);
          break;
        case 'instructor':
          token = jwt.sign(payload, process.env.INSTRUCTOR_SECRET_KEY);
          resolve(token);
          break;
        case 'student':
          token = jwt.sign(payload, process.env.STUDENT_SECRET_KEY);
          resolve(token);
          break;
        default:
          reject(new Error('unknown userType'));
          break;
      }

      //else do something else
    } else {
      reject(new Error('error with the payload = null'));
    }
  });
};
