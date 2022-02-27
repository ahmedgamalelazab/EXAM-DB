class GenerateStudentPracticalExamReport {
  constructor(examViewContainer, url, payload) {
    this.examViewContainer = examViewContainer;
    this.url = url;
    this.sheetAnswerTable = [];
  }
  //start the service
  async start() {
    return new Promise(async (resolve, reject) => {
      if (this.examViewContainer && this.url) {
        //connect the internet
        try {
          const serverResponse = await fetch(this.url, {
            method: 'GET',
            //TODO fix the code after protection process on the backend side

            headers: {
              'x-auth-token': window.localStorage.getItem('studentToken'),
            },
          });
          //if all are ok
          const result = await serverResponse.json(); //[SUCCESS , Data]
          const { success, data } = result;
          if (success) {
            console.log(data);
            data.forEach((examObject, index) => {
              $(this.examViewContainer).append(`
                <div class="quiz-box quiz-1">
                  <h2 class="quiz-question">${examObject.questionId}-${
                examObject.questionName
              }</h2>
                  <span class="quiz-answer">
                      <label>Your Answer : <b style="${
                        examObject.studentAnswer !== examObject.correct_answer
                          ? 'color:red'
                          : 'color:green'
                      }">${examObject.studentAnswer}</b></label>
                      <label> Exam Correct Answer : <b style="color:green">${
                        examObject.correct_answer
                      }</b></label>          
                  </span>
                </div>
              `);
            });
            //if data appeared then update the container and append according the returned data from the server
            //service will return exam sheet answer object
            resolve({
              data: data,
            });
          } else {
            const { message } = result;
            console.log(message);
            reject(message);
          }
        } catch (err) {
          reject(err);
        }
      } else {
        reject(
          new Error(
            `you must provide the service the exam view container && valid url`
          )
        );
      }
    });
  }
}

export { GenerateStudentPracticalExamReport };
