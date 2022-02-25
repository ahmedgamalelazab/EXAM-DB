console.log('hello world');

import { StudentProfileBuilderService } from '../../services/buildStudentProfileService.js';

import { serverConfig } from '../../serverConfig/serverConfig.js';

//hook onto the elements that will pass to the service then call the service

(async function () {
  const studentProfileCardMain = document.getElementById('cardBuilderMain');

  const url = `${serverConfig.backendServer}/ExamApp/api/v1/Student/profile`;

  const studentProfileBuilder = await new StudentProfileBuilderService(
    url,
    studentProfileCardMain
  ).start();

  console.log(studentProfileBuilder);
})();
