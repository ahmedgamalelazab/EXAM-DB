import { serverConfig } from '../../serverConfig/serverConfig.js';

$(document).ready(function () {
  $('#custum-button').on('click', function () {
    $('#sidebar-wrapper').toggle();
  });
  var baseurl = `${serverConfig.backendServer}/ExamApp/api/v1/Student/solvedExams`;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', baseurl, true);
  xmlhttp.setRequestHeader(
    'x-auth-token',
    window.localStorage.getItem('studentToken')
  );
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var studentExam = JSON.parse(xmlhttp.responseText);
      $('#example').DataTable({
        data: studentExam.data,
        columns: [
          { data: 'id' },
          { data: 'totalMarks' },
          { data: 'exam_id' },
          { data: 'student_id' },
        ],
      });
    }
  };
  xmlhttp.send();
});
