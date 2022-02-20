const tableNames = require('../tables/tables.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableNames.mainUser).del();
  await knex(tableNames.mainUser).insert({
    id: knex.raw('NEWID()'),
    first_name: 'ITIAdmins',
    last_name: 'ITITeamAdmins',
    email: 'admin@admin.com',
    password: 'admin',
  });
  await knex(tableNames.department).del();
  await knex(tableNames.department).insert([
    { name: 'Mobile Cross Platform development' },
    { name: 'Software Development' },
    { name: 'AI' },
    { name: 'Professional Development' },
    { name: 'Open Source' },
    { name: 'Mobile Native' },
    { name: 'Backend Development' },
    { name: 'Mern Stack' },
    { name: 'Mean Stack' },
    { name: 'Full Stack Web Development' },
    { name: 'IOT development' },
  ]);

  //seeding the courses
  // topic
  await knex(tableNames.topic).del();
  await knex(tableNames.topic).insert([
    { name: 'Web' },
    { name: 'Mobile' },
    { name: 'Programming' },
    { name: 'DB' },
    { name: 'Design' },
    { name: 'Operating system' },
  ]);

  await knex(tableNames.course).del();
  await knex(tableNames.course).insert([
    { name: 'Java', total_hours: 50, topic_id: 3 },
    { name: 'C++', total_hours: 80, topic_id: 3 },
    { name: 'C#', total_hours: 90, topic_id: 3 },
    { name: 'HTML', total_hours: 40, topic_id: 1 },
    { name: 'CSS', total_hours: 70, topic_id: 1 },
    { name: 'Photoshop', total_hours: 80, topic_id: 5 },
    { name: 'Mongo DB', total_hours: 80, topic_id: 4 },
    { name: 'Javascipt', total_hours: 70, topic_id: 1 },
    { name: 'XML', total_hours: 85, topic_id: 3 },
    { name: 'Unix', total_hours: 90, topic_id: 6 },
    { name: 'Ecma6', total_hours: 10, topic_id: 3 },
    { name: 'jQuery', total_hours: 40, topic_id: 1 },
    { name: 'Android', total_hours: 12, topic_id: 2 },
    { name: 'Flutter', total_hours: 95, topic_id: 2 },
    { name: 'SQL', total_hours: 75, topic_id: 4 },
  ]);

  //yasser
  await knex(tableNames.course_dept).del();
  await knex(tableNames.course_dept).insert([
    { crs_id: 1, dept_id: 1 },
    { crs_id: 1, dept_id: 2 },
    { crs_id: 1, dept_id: 3 },
    { crs_id: 2, dept_id: 4 },
    { crs_id: 2, dept_id: 2 },
    { crs_id: 3, dept_id: 1 },
    { crs_id: 4, dept_id: 3 },
  ]);
};
