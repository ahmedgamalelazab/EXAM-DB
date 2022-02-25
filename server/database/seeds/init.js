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

  ////////////////////////////////////////////////random questions for practical exam ////////////////////////////////////////
  //^seeding some answers and questions for the practical Exam
  await knex(tableNames.answers).del();
  await knex(tableNames.questions).del();
  await knex(tableNames.questions).insert([
    {
      name: 'what is the capital of Egypt ?',
      question_type: 'MCQ',
      question_point: 2,
      correct_answer: 'Cairo',
    },
    {
      name: 'how many days in the year ?',
      question_type: 'MCQ',
      question_point: 5,
      correct_answer: '365',
    },
    {
      name: 'what color of the sea ?',
      question_type: 'MCQ',
      question_point: 10,
      correct_answer: 'blue',
    },
    {
      name: 'How many independent city-states were there in the world in 2020 ?',
      question_type: 'MCQ',
      question_point: 5,
      correct_answer: 'three',
    },
    {
      name: 'What country did Hawaiian pizza come from ?',
      question_type: 'MCQ',
      question_point: 8,
      correct_answer: 'Canada',
    },
    {
      name: 'What is the topmost part of a column called ?',
      question_type: 'MCQ',
      question_point: 10,
      correct_answer: 'Capital',
    },
    {
      name: 'What is divided into 114 suras ?',
      question_type: 'MCQ',
      question_point: 4,
      correct_answer: 'The Quran',
    },
    {
      name: 'How many stars does the New Zealand national flag have ?',
      question_type: 'MCQ',
      question_point: 3,
      correct_answer: 'Four',
    },
    {
      name: 'Who is Ted Kaczynski known as ?',
      question_type: 'MCQ',
      question_point: 6,
      correct_answer: 'The Unabomber',
    },
    {
      name: 'Alberto Tomba is a name associated with which sport ?',
      question_type: 'MCQ',
      question_point: 9,
      correct_answer: 'Skiing',
    },
    {
      name: 'An Octagon with equal sides is called a what ?',
      question_type: 'MCQ',
      question_point: 2,
      correct_answer: 'A Regular Octagon',
    },
    {
      name: 'Who plays their home games in the so-called Dean Dome ?',
      question_type: 'MCQ',
      question_point: 1,
      correct_answer: 'The North Carolina Tar Heels',
    },
    {
      name: 'Which bird is the national bird of Panama ?',
      question_type: 'MCQ',
      question_point: 2,
      correct_answer: 'Harpy eagle',
    },
    {
      name: 'What do Jews purge their home of during Passover?',
      question_type: 'MCQ',
      question_point: 4,
      correct_answer: 'Chametz',
    },
    {
      name: 'What was the first artificial flavouring ?',
      question_type: 'MCQ',
      question_point: 5,
      correct_answer: 'Vanilla Essence',
    },
    {
      name: 'What is the color of the Italian liqeuer Galliano ?',
      question_type: 'MCQ',
      question_point: 8,
      correct_answer: 'Yellow',
    },
    {
      name: 'What is the literal translation of the word Brandy ?',
      question_type: 'MCQ',
      question_point: 8,
      correct_answer: 'Burned wine',
    },
    {
      name: 'How many points are E and O each worth in a Scrabble game ?',
      question_type: 'MCQ',
      question_point: 2,
      correct_answer: 'One',
    },
    {
      name: 'What sport would you be playing if the score was deuce ?',
      question_type: 'MCQ',
      question_point: 8,
      correct_answer: 'Tennis',
    },
  ]);
  //^answers
  await knex(tableNames.answers).insert([
    {
      answer_one: 'Tanta',
      answer_two: 'Cairo',
      answer_three: 'Alexandria',
      answer_four: 'Giza',
      question_id: 1,
    },
    {
      answer_one: '190',
      answer_two: '200',
      answer_three: '300',
      answer_four: '365',
      question_id: 2,
    },
    {
      answer_one: 'red',
      answer_two: 'yellow',
      answer_three: 'dark',
      answer_four: 'blue',
      question_id: 3,
    },
    {
      answer_one: 'four',
      answer_two: 'two',
      answer_three: 'three',
      answer_four: 'ten',
      question_id: 4,
    },
    {
      answer_one: 'Egypt',
      answer_two: 'Canada',
      answer_three: 'USA',
      answer_four: 'Russia',
      question_id: 5,
    },
    {
      answer_one: 'Head',
      answer_two: 'Tail',
      answer_three: 'Top',
      answer_four: 'Capital',
      question_id: 6,
    },
    {
      answer_one: 'Bibal',
      answer_two: 'The Quran',
      answer_three: 'Random Book',
      answer_four: 'Gen Book',
      question_id: 7,
    },
    {
      answer_one: 'one',
      answer_two: 'two',
      answer_three: 'three',
      answer_four: 'Four',
      question_id: 8,
    },
    {
      answer_one: 'the bomber',
      answer_two: 'the anti Bomber',
      answer_three: 'superMan',
      answer_four: 'The Unabomber',
      question_id: 9,
    },
    {
      answer_one: 'Diving',
      answer_two: 'Flying',
      answer_three: 'Skiing',
      answer_four: 'Gambling',
      question_id: 10,
    },
    {
      answer_one: 'A Multi Octagon',
      answer_two: 'A Regular Square',
      answer_three: 'A Regular Octagon',
      answer_four: 'A Squeezing Rom',
      question_id: 11,
    },
    {
      answer_one: 'The west Carolina Tar Heels',
      answer_two: 'The North Carolina Tar Heels',
      answer_three: 'The East Carolina Tar Heels',
      answer_four: 'The south Carolina Tar Heels',
      question_id: 12,
    },
    {
      answer_one: 'Narrow eagle',
      answer_two: 'Harpy eagle',
      answer_three: 'Happy eagle',
      answer_four: 'Slider eagle',
      question_id: 13,
    },
    {
      answer_one: 'Chametz',
      answer_two: 'Chamets',
      answer_three: 'Chametw',
      answer_four: 'Chameta',
      question_id: 14,
    },
    {
      answer_one: 'Room Essence',
      answer_two: 'Black Essence',
      answer_three: 'Vanilla Essence',
      answer_four: 'White Essence',
      question_id: 15,
    },
    {
      answer_one: 'Yellow',
      answer_two: 'Red',
      answer_three: 'Dark',
      answer_four: 'Black',
      question_id: 16,
    },
    {
      answer_one: 'Burned wine',
      answer_two: 'Cool wine',
      answer_three: 'Lost wine',
      answer_four: 'Bounded wine',
      question_id: 17,
    },
    {
      answer_one: 'One',
      answer_two: 'Two',
      answer_three: 'Three',
      answer_four: 'Four',
      question_id: 18,
    },
    {
      answer_one: 'Tennis',
      answer_two: 'Football',
      answer_three: 'Skiing',
      answer_four: 'BaseBall',
      question_id: 19,
    },
  ]);
  ////////////////////////////////////////////////random questions for practical exam ////////////////////////////////////////
};
