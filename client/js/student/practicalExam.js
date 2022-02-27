console.log('hello practical Exam');
import { serverConfig } from '../../serverConfig/serverConfig.js';
import { GeneratePracticalExamService } from '../../services/generatePracticalExamService.js';
import { ExamCorrectionService } from '../../services/ExamCorrectionService.js';
import { ExamService } from '../../services/examService.js';

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

  const answerForm = document.forms[0];

  console.log(answerForm);

  //call the service code
  //service code will get the collection code then the service will connect with the backend server and get the whole practical exam load and load it dynamically into the main page exam view
  const url = `${serverConfig.backendServer}/ExamApp/api/v1/Exam/practical`;

  //start the service and start listen to the user inputs and build the whole student answer sheet
  try {
    const result = await new GeneratePracticalExamService(
      questionListContainer,
      url
    ).start();
    console.log(result);

    questionListContainer.addEventListener('click', e => {
      console.log(e.target.value);
      console.log(e.target.name);
      //check if the user solved the question already
      if (e.target.value && e.target.name) {
        // simple
        //if the id is exist before then write the new value or it

        //?remove if the same id entered
        studentAnswerSheet = studentAnswerSheet.filter(studentAnswer => {
          return studentAnswer.id != e.target.name;
        });

        //?then push it again
        studentAnswerSheet.push({
          id: e.target.name,
          student_answer: e.target.value,
        });
      }
    });

    //we will send the student answer sheet and the exam model answer sheet to a service and the service will start to correct the exam on the front side then it will talk with the backend to send the backend data to store it
    answerForm.onsubmit = async function (e) {
      e.preventDefault();
      console.log(studentAnswerSheet);

      //send the payload to the backend and the back end will correct and store the whole information in the backend server
      //use the student token to complete the process and fill the tables
      //and when the student login go and call a proc to get the student exam data
      //^ await for correction service and get the result and push it withe payload
      const correctingExamServicePayload = {
        studentAnswerModel: studentAnswerSheet,
        examModelAnswer: result.answerSheet,
        exam_type: 'practical_exam',
      };

      const correctionResult = await new ExamCorrectionService(
        studentAnswerSheet,
        result.answerSheet
      ).start();

      correctingExamServicePayload.studentExamMarks =
        correctionResult.studentMark;
      correctingExamServicePayload.examFullMarks =
        correctionResult.examFullMark;

      const correctionUrl = `${serverConfig.backendServer}/ExamApp/api/v1/Exam/student/finished`;
      const examCorrectionResult = await new ExamService(
        correctionUrl,
        correctingExamServicePayload
      ).start();

      //TODO hold the state

      window.location.replace(
        `${serverConfig.serverUrl}${serverConfig.port}/client/student/student.html`
      );

      console.log(examCorrectionResult);

      console.log(correctingExamServicePayload);
    };

    //no errors from the service
  } catch (error) {
    console.log(error);
  }
})();
