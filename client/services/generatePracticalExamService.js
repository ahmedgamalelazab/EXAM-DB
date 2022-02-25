class GeneratePracticalExamService {
  constructor(examViewContainer, url) {
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
            /*
            headers: {

              'x-auth-token': window.localStorage.getItem('adminToken'),
            },
            */
          });
          //if all are ok
          const result = await serverResponse.json(); //[SUCCESS , Data]
          const { success, data } = result;
          if (success) {
            console.log(data);
            data.forEach((examObject, index) => {
              $(this.examViewContainer).append(`
                <div class="quiz-box quiz-1">
                <h2 class="quiz-question">${examObject.id} - ${examObject.name} ( ${examObject.question_point} points )</h2>
                <span class="quiz-answer">
                <label><input type="radio" value = "${examObject.answer_one}" name="${examObject.id}">${examObject.answer_one}</label>
                <label><input type="radio" value = "${examObject.answer_two}" name="${examObject.id}">${examObject.answer_two}</label>
                <label><input type="radio"  value = "${examObject.answer_three}" name="${examObject.id}">${examObject.answer_three}</label>
                <label><input type="radio" value= "${examObject.answer_four}" name="${examObject.id}">${examObject.answer_four}</label>                
                <label class="QCA" ><input type="radio" value = "${examObject.correct_answer}" name="q${examObject.id}">${examObject.correct_answer}</label>                
                </span>                
                </div>
            `);
              $('.QCA').hide();
              this.sheetAnswerTable.push({
                id: examObject.id,
                answer: examObject.correct_answer,
                question_points: examObject.question_point,
              });
            });

            //if data appeared then update the container and append according the returned data from the server
            //service will return exam sheet answer object
            resolve({
              data: data,
              answerSheet: this.sheetAnswerTable,
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

export { GeneratePracticalExamService };
