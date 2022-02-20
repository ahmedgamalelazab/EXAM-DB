$(document).ready(function () {
    $("#custum-button").on("click", function () {
        $("#sidebar-wrapper").toggle();
    });
    var baseurl = "https://jsonplaceholder.typicode.com/todos";
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.open("GET",baseurl,true);
 xmlhttp.onreadystatechange = function(){
     if(xmlhttp.readyState==4 && xmlhttp.status ==200){
         var persons = JSON.parse(xmlhttp.responseText);
         $("#example").DataTable({
            data:persons,
            "columns":[
                {"data":"userId"},
                {"data":"id"},
                {"data":"title"},
                {"data":"completed"}
            ]
         });
     }
 };
 xmlhttp.send();
});