const tableNames = require('../tables/tables.js');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.mainUser, function (table) {
    table.uuid('id').primary().notNullable().defaultTo(knex.raw(`NEWID()`));
    table.string('first_name', 50).notNullable();
    table.string('last_name', 50).notNullable();
    table.string('email', 150).notNullable();
    // .checkRegex(
    //   '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$'
    // );
    table.string('password', 150).notNullable();
  });

  await knex.schema.createTable(tableNames.topic, function (table) {
    table.increments('id').primary().notNullable();
    table.string('name', 50).notNullable();
  });

  await knex.schema.createTable(tableNames.course, function (table) {
    table.increments('id').primary().notNullable(),
      table.string('name', 50).notNullable();
    table.integer('total_hours').notNullable();
    //* step one
    table.integer('topic_id').notNullable();
    //* step two
    table
      .foreign('topic_id')
      .references('id')
      .inTable(tableNames.topic)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable(tableNames.department, function (table) {
    table.increments('id').primary().notNullable();
    table.string('name', 50).notNullable();
  });

  await knex.schema.createTable(tableNames.instructor, table => {
    table.uuid('id').primary().notNullable().defaultTo(knex.raw(`NEWID()`));
    table.string('phone_number', 20).notNullable();
    table.integer('salary', 3).notNullable();
    //* step one
    table.integer('course_id').notNullable();
    table.integer('dept_id').notNullable();
    table.uuid('user_id').notNullable();
    //* step two
    table
      .foreign('course_id')
      .references('id')
      .inTable(tableNames.course)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .foreign('dept_id')
      .references('id')
      .inTable(tableNames.department)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .foreign('user_id')
      .references('id')
      .inTable(tableNames.mainUser)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  // reem2
  await knex.schema.createTable(tableNames.questions, function (table) {
    table.increments('id').primary().notNullable(),
      table.string('name', 100).notNullable();
    table
      .string('question_type', 50)
      .notNullable()
      .checkIn(['MCQ', 'TRUEorFALSE']);
    table.integer('question_point').notNullable();
    table.string('correct_answer', 100).notNullable();
    table.boolean('genByInstructor').defaultTo(false);
  });

  await knex.schema.createTable(tableNames.answers, function (table) {
    table.increments('id').primary().notNullable();
    table.string('answer_one', 50).notNullable();
    table.string('answer_two', 50).notNullable();
    table.string('answer_three', 50).notNullable();
    table.string('answer_four', 50).notNullable();
    //* step one
    table.integer('question_id').notNullable();
    //* step two
    table
      .foreign('question_id')
      .references('id')
      .inTable(tableNames.questions)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  //yasser
  await knex.schema.createTable(tableNames.exam, function (table) {
    table.increments('id').primary().notNullable();
    table.string('exam_name', 50);
    table
      .string('exam_type', 50)
      .checkIn(['instructor_exam', 'practical_exam']);
    table.bigInteger('duration');
    table.integer('total_marks');
    //* step one
    table.uuid('instructor_id');
    //* step two
    table
      .foreign('instructor_id')
      .references('id')
      .inTable(tableNames.instructor)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable(tableNames.student, function (table) {
    table.uuid('id').primary().notNullable().defaultTo(knex.raw(`NEWID()`));
    table.string('phone_number', 20).notNullable();
    //waiting for foreign
    table.uuid('user_id').notNullable();
    table.integer('dept_id').notNullable();
    table
      .foreign('dept_id')
      .references('id')
      .inTable(tableNames.department)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .foreign('user_id')
      .references('id')
      .inTable(tableNames.mainUser)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable(
    tableNames.student_exam_question,
    async function (table) {
      table.increments('id').primary().notNullable();
      table.integer('exam_id');
      table.uuid('student_id');
      table.integer('question_id');
      table.string('answer', 50); // yassssser

      table.foreign('student_id').references('id').inTable(tableNames.student);
      //   .onUpdate('CASCADE')
      //   .onDelete('CASCADE');
      table
        .foreign('exam_id')
        .references('id')
        .inTable(tableNames.exam)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table
        .foreign('question_id')
        .references('id')
        .inTable(tableNames.questions)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    }
  );

  await knex.schema.createTable(tableNames.course_dept, function (table) {
    table.increments('id').primary().notNullable();
    table.integer('crs_id').notNullable();
    table.integer('dept_id').notNullable();
    //step two
    table
      .foreign('crs_id')
      .references('id')
      .inTable(tableNames.course)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .foreign('dept_id')
      .references('id')
      .inTable(tableNames.department)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  // await knex.schema.createTable(
  //   tableNames.instructor_department,
  //   function (table) {
  //     table.increments('id').primary().notNullable();
  //     table.uuid('instructor_id').notNullable();
  //     table.integer('dept_id').notNullable();

  //     table
  //       .foreign('dept_id')
  //       .references('id')
  //       .inTable(tableNames.department)
  //       .onUpdate('CASCADE')
  //       .onDelete('CASCADE');

  //     table
  //       .foreign('instructor_id')
  //       .references('id')
  //       .inTable(tableNames.instructor);
  //   }
  // );

  // reem
  await knex.schema.createTable(
    tableNames.instructor_student,
    async function (table) {
      table.increments('id').primary().notNullable();
      table.uuid('student_id').notNullable();
      table.uuid('instructor_id').notNullable();
      //TODO

      table
        .foreign('instructor_id')
        .references('id')
        .inTable(tableNames.instructor);
      // .onUpdate('CASCADE')
      // .onDelete('CASCADE');

      table.foreign('student_id').references('id').inTable(tableNames.student);
      // .onUpdate('CASCADE')
      // .onDelete('CASCADE');
    }
  );

  await knex.schema.createTable(
    tableNames.studentExamMarks,
    async function (table) {
      table.increments('id').primary().notNullable();
      table.integer('totalMarks').notNullable();
      table.integer('exam_id').notNullable();
      table.uuid('student_id').notNullable();

      table.foreign('student_id').references('id').inTable(tableNames.student);
      // .onUpdate('CASCADE')
      // .onDelete('CASCADE');

      table
        .foreign('exam_id')
        .references('id')
        .inTable(tableNames.exam)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(tableNames.instructor_student);
  await knex.schema.dropTableIfExists(tableNames.instructor_department);
  await knex.schema.dropTableIfExists(tableNames.course_dept);
  await knex.schema.dropTableIfExists(tableNames.student_exam_question);
  await knex.schema.dropTableIfExists(tableNames.studentExamMarks);
  await knex.schema.dropTableIfExists(tableNames.student);
  await knex.schema.dropTableIfExists(tableNames.exam);
  await knex.schema.dropTableIfExists(tableNames.answers);
  await knex.schema.dropTableIfExists(tableNames.questions);
  await knex.schema.dropTableIfExists(tableNames.instructor);
  await knex.schema.dropTableIfExists(tableNames.department);
  await knex.schema.dropTableIfExists(tableNames.course);
  await knex.schema.dropTableIfExists(tableNames.topic);
  await knex.schema.dropTableIfExists(tableNames.mainUser);
};
