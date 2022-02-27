import { serverConfig } from '../../serverConfig/serverConfig.js';

$(document).ready(function () {
  $('#custum-button').on('click', function () {
    $('#sidebar-wrapper').toggle();
  });
  var baseurl = `${serverConfig.backendServer}/ExamApp/api/v1/Student/solvedExams`;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open('GET', baseurl, false);
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
      //after sending

      let table = $('#example').DataTable();
      console.log(table);
      $('#example').on('click', 'tr', function () {
        var student_id = table.row(this).data().student_id;
        var exam_id = table.row(this).data().exam_id;
        console.log(student_id);
        console.log(exam_id);
        window.localStorage.setItem(
          'student_exam_data',
          JSON.stringify({
            student_id: student_id,
            exam_id: exam_id,
          })
        );
        window.location.href = `${serverConfig.serverUrl}${serverConfig.port}/client/exam/studentPracticalExamReport.html`;
      });
    }
  };
  xmlhttp.send();
});
