const jwt = require('jsonwebtoken');
const { request, response } = require('express');
/**
 *  * detect user .. request should pass on chain of responsibility user detection object
 *  * fetch user data important
 *  * write the auth code
 */

//^ assume that the request or all the request should have a web token
//^ if not or the request not has a jwt or has invalid jwt token then refuse it and return back 403 forbidden

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports.authMiddleWere = async function (req, res, next) {
  const userToken = req.headers['x-auth-token'];
  if (userToken) {
    //dispatching the user token on the secrets stored on the server
    try {
      //assume that the usr is admin
      const userObject = jwt.verify(userToken, process.env.ADMIN_SECRET_KEY);
      req.payload = {
        userLoad: userObject,
        userType: 'admin',
      };
      next();
    } catch (error) {
      try {
        const userObject = jwt.verify(
          userToken,
          process.env.STUDENT_SECRET_KEY
        );
        req.payload = {
          userLoad: userObject,
          userType: 'student',
        };
        next();
      } catch (err) {
        const userObject = jwt.verify(
          userToken,
          process.env.INSTRUCTOR_SECRET_KEY
        );
        req.payload = {
          userLoad: userObject,
          userType: 'instructor',
        };
        next();
      }
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'forbidden invalid token',
    });
  }
};
