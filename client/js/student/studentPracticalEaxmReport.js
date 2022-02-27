console.log('hello world');
import { serverConfig } from '../../serverConfig/serverConfig.js';
import { GenerateStudentPracticalExamReport } from '../../services/generateStudentPracticalExamReport.js';

//IIFE

(async function () {
  //design algorithm to get the exam and print in in array of views
  /**
   * ^1. lookup for the changing part in the view
   * ^2. replace the part which change with the response from internet
   * ^3. pick the suitable data structure to store the result in it
   * ^4. map the internet result into view
   * * Correcting the damn exam :
   * * create observer object-service to watch the user inputs
   * * when the user pick or click on any answer we notify the collector to collect the user choices
   * * once the user finish the exam we compare the result from the server [model answer sheet ] with the user solution sheet then we make the system compare both of them
   * * student point for each question will be given according to his answer
   */

  //array of user solution we
  let studentAnswerSheet = [];

  //hooking

  //this will be sent to the service to load the server load inside of it
  const questionListContainer = document.getElementById(
    'questionListContainer'
  );

  //start the service and start listen to the user inputs and build the whole student answer sheet
  try {
    //fetch the data from the local store
    const studentData = JSON.parse(localStorage.getItem('student_exam_data'));
    //call the service code
    //service code will get the collection code then the service will connect with the backend server and get the whole practical exam load and load it dynamically into the main page exam view
    const url = `${serverConfig.backendServer}/ExamApp/api/v1/Student/solvedExams/particularExam/?student_id=${studentData.student_id}&exam_id=${studentData.exam_id}`;
    const result = await new GenerateStudentPracticalExamReport(
      questionListContainer,
      url
    ).start();
    console.log(result);
    //if no error
    //no errors from the service
  } catch (error) {
    console.log(error);
  }
})();
