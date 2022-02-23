import { serverConfig } from '../../serverConfig/serverConfig.js';
$(document).ready(function () {
  $('#custum-button').on('click', function () {
    $('#sidebar-wrapper').toggle();
  });
  var baseurl = `${serverConfig.backendServer}/ExamApp/api/v1/Departments`;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', baseurl, true);
  xmlhttp.setRequestHeader(
    'x-auth-token',
    window.localStorage.getItem('adminToken')
  );
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var students = JSON.parse(xmlhttp.responseText);
      $('#example').DataTable({
        data: students.data,
        columns: [{ data: 'name' }],
      });
    }
  };
  xmlhttp.send();
});
