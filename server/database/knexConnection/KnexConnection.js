const { development } = require('../../knexfile.js');
//! warning this not gonna work but only in the development if u wanna in production refactor the code
module.exports.knexQueryBuilderHelper = require('knex').knex(development);
