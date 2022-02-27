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
    }/ExamApp/api/v1/Topics/courses?topic_id=${
      window.localStorage.getItem('topic_id') || 0
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
            { data: 'course_id' },
            { data: 'courseName' },
            { data: 'course_total_hrs' },
            { data: 'topic_name' },
          ],
        });
      }
    };
    xmlhttp.send();
    window.localStorage.setItem('topic_id', 0);
  })();

  generateTopicCoursesReportButton.addEventListener('click', function () {
    //hook on the id inout view

    const topic_id = document.getElementById('input-topic-id').value;

    window.localStorage.setItem('topic_id', topic_id);

    window.location.reload();

    console.log(topic_id);
  });
});
