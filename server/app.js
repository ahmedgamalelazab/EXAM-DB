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

  app.use(require('./routes/Instructor.routes.js'));

  app.use(require('./routes/student.routes.js'));

  app.use(require('./routes/Departments.routes.js'));
  //reem courses
  app.use(require('./routes/Courses.routes.js'));

  app.use('/', (req, res, next) => {
    res.json({
      message: 'hello world',
    });
  });

  app.listen(5555, () => {
    console.log(`server is on and listening on 5555`);
  });
})();
