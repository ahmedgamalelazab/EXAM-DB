const {
  MSSQLConnection,
} = require('../database/nativeConnection/dbNativeConnection.js');
const { request, response } = require('express');
const { generateToken } = require('../utils/tokenGeneration.js');
const { development } = require('../knexfile.js');
//! warning this not gonna work but only in the development if u wanna in production refactor the code
const knexQueryBuilderHelper = require('knex').knex(development);
const tableNames = require('../database/tables/tables.js');
/**
 * @description login and bring to the response the token that will authorize the user to the apis
 * @param {Request} req
 * @param {Response} res
 * @param {import('knex').knex}knex
 */
module.exports.loginUserAndDispatch = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    //search for the email and address in the user table
    let result = await knexQueryBuilderHelper(tableNames.mainUser).where({
      email: email,
    });
    //if email founded then search who this email belongs to
    if (result.length !== 0) {
      let user = result[0]; // this is the user data
      if (
        user.email == process.env.ADMIN_EMAIL &&
        user.password == process.env.ADMIN_PASSWORD &&
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        //if all are ok
        const token = await generateToken(user, 'admin');
        res.status(201).json({
          success: true,
          token: token,
          user: 'admin',
        });
        return;
      } else {
        let instructorResult = await knexQueryBuilderHelper(
          tableNames.instructor
        ).where({
          user_id: user.id,
        });
        if (instructorResult.length !== 0) {
          //user is a instructor
          if (user.email === email && user.password === password) {
            //if the user 100% is instructor
            //then we wanna to payload with the whole user data
            const loggedInstructor = await knexQueryBuilderHelper(
              tableNames.instructor
            ).where({
              user_id: user.id,
            });
            //resolving the instructor data
            user.ins_id = loggedInstructor[0].id;
            user.ins_phone_number = loggedInstructor[0].phone_number;
            const target_dept = await knexQueryBuilderHelper(
              tableNames.department
            ).where({
              id: loggedInstructor[0].dept_id,
            });
            user.ins_department = target_dept[0].name;
            const token = await generateToken(user, 'instructor');
            res.status(201).json({
              success: true,
              token: token,
              user: 'instructor',
            });
            return;
          } else {
            res.status(401).json({
              success: false,
              message: 'invalid email or password',
            });
            return;
          }
        } else {
          let studentResult = await knexQueryBuilderHelper(
            tableNames.student
          ).where({
            user_id: user.id,
          });
          if (studentResult.length !== 0) {
            //user is student
            if (user.email === email && user.password === password) {
              user.student_id = studentResult[0].id;
              user.student_phone_number = studentResult[0].phone_number;
              const target_dept = await knexQueryBuilderHelper(
                tableNames.department
              ).where({
                id: studentResult[0].dept_id,
              });
              user.student_department = target_dept[0].name;
              const token = await generateToken(user, 'student');
              res.status(201).json({
                success: true,
                token: token,
                user: 'student',
              });
              return;
            } else {
              res.status(401).json({
                success: false,
                message: 'invalid email or password',
              });
              return;
            }
          } else {
            res.status(401).json({
              success: false,
              message: 'invalid email or password',
            });
            return;
          }
        }
      }
    } else {
      //empty array that's mean no user found in the user table
      res.status(401).json({
        success: false,
        message: 'invalid email or password',
      });
      return;
    }
  } else {
    res.status(500).json({
      success: false,
      message: 'error with the params',
    });
  }
};
