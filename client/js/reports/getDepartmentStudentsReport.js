import { serverConfig } from '../../serverConfig/serverConfig.js';

$(document).ready(function () {
  $('#custum-button').on('click', function () {
    $('#sidebar-wrapper').toggle();
  });
  //hooking
  const generateTopicCoursesReportButton = document.getElementById(
    'generateTopicCourseReportCrystal'
  );

  console.log('hello world');

  (async function () {
    var baseurl = `${
      serverConfig.backendServer
    }/ExamApp/api/v1/Departments/students?dept_id=${
      window.localStorage.getItem('dept_id') || 0
    }`;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', baseurl, true);
    xmlhttp.setRequestHeader(
      'x-auth-token',
      window.localStorage.getItem('adminToken')
    );
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var reports = JSON.parse(xmlhttp.responseText);
        $('#example').DataTable({
          data: reports.data,
          columns: [
            { data: 'student_id' },
            { data: 'student_first_name' },
            { data: 'student_last_name' },
            { data: 'student_email' },
            { data: 'student_department' },
          ],
        });
      }
    };
    xmlhttp.send();
    window.localStorage.setItem('dept_id', 0);
  })();

  generateTopicCoursesReportButton.addEventListener('click', function () {
    //hook on the id inout view

    const dept_id = document.getElementById('input-topic-id').value;

    window.localStorage.setItem('dept_id', dept_id);

    window.location.reload();

    console.log(dept_id);
  });
});
