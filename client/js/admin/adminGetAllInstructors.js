import { serverConfig } from '../../serverConfig/serverConfig.js';

$(document).ready(function () {
  $('#custum-button').on('click', function () {
    $('#sidebar-wrapper').toggle();
  });
  var baseurl = `${serverConfig.backendServer}/ExamApp/api/v1/Instructor`;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open('GET', baseurl, true);
  xmlhttp.setRequestHeader(
    'x-auth-token',
    window.localStorage.getItem('adminToken')
  );
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var instructors = JSON.parse(xmlhttp.responseText);
      $('#example').DataTable({
        data: instructors.data,
        columns: [
          { data: 'userFirstName' },
          { data: 'userLastName' },
          { data: 'userEmail' },
          { data: 'department' },
          { data: 'courses' },
          { data: 'insSalary' },
          { data: 'insPhone' },
        ],
      });
    }
  };
  xmlhttp.send();
});
