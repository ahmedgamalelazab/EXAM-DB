import { DeptCrsDataFetcher } from '../../services/dept-crs-data-fetcherService.js';
import { serverConfig } from '../../serverConfig/serverConfig.js';
import { AddInstructorService } from '../../services/addInstructorService.js';
(async () => {
  console.log('hello add instructor');

  // hook
  const form = document.forms[0];
  let reqPayload = {};
  const first_name = document.getElementById('fname-input-field');
  const last_name = document.getElementById('lname-input-field');
  const email = document.getElementById('email-input-field');
  const password = document.getElementById('pawssword-input-field');
  const phone_number = document.getElementById('phone-input-field');
  const salary = document.getElementById('salary-input-field');
  const departUIComponent = document.getElementById('Department-UI-Component');
  const CourseUIComponent = document.getElementById('Course-UI-Component');

  //service run
  const departmentURL = `${serverConfig.backendServer}/ExamApp/api/v1/Departments`;
  const departmentUIupdateService = new DeptCrsDataFetcher(
    departUIComponent,
    departmentURL,
    'department'
  );

  const courseURL = `${serverConfig.backendServer}/ExamApp/api/v1/Courses`;
  const courseUIupdateService = new DeptCrsDataFetcher(
    CourseUIComponent,
    courseURL,
    'course'
  );

  await departmentUIupdateService.start();
  await courseUIupdateService.start();

  CourseUIComponent.addEventListener('click', e => {
    console.log(e.target.innerText);
    $('#courseDropper').text(e.target.innerText);
    console.log($(e.target).attr('id'));
    reqPayload.crs_id = $(e.target).attr('id');

    //TODO reqPayload.crs_id = id
  });
  departUIComponent.addEventListener('click', e => {
    console.log(e.target.innerText);
    $('#departmentDropper').text(e.target.innerText);
    reqPayload.dept_id = reqPayload.crs_id = $(e.target).attr('id');
  });
  //2 service [x]

  form.onsubmit = async e => {
    e.preventDefault();
    //^1. preparing the payload
    reqPayload.first_name = first_name.value.toString();
    reqPayload.last_name = last_name.value.toString();
    reqPayload.email = email.value.toString();
    reqPayload.password = password.value.toString();
    reqPayload.phone_number = phone_number.value.toString();
    reqPayload.salary = salary.value.toString();
    console.log(reqPayload);
    //^2. preparing the payload
    await new AddInstructorService(reqPayload).start();
  };

  //catch errors
})();
