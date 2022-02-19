(async function () {
  const express = require('express');
  require('colors');
  const app = express();

  const pool =
    await require('./database/nativeConnection/dbNativeConnection.js').MSSQLConnection.initMSSQLConnection();

  if (pool.connected) {
    console.log(`mssql data base connected...`.bgGreen.underline.black.bold);
  }

  app.use(express.json());

  //reem courses
  app.use(require('./routes/Courses.routes.js'));
  app.use(require('./routes/Topics.routes.js'));
  app.use(require('./routes/Courses_dept.routes.js'));
  // app.use(require('./routes/Instructor_dept.routes'));

  app.use('/', (req, res, next) => {
    res.json({
      message: 'hello world',
    });
  });

  app.listen(5555, () => {
    console.log(`server is on and listening on 5555`);
  });
})();
