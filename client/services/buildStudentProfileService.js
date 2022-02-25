class StudentProfileBuilderService {
  constructor(url, mainView) {
    this.url = url;
    this.mainView = mainView;
  }

  async start() {
    return new Promise(async (resolve, reject) => {
      if (this.url && this.mainView) {
        //if so call the backend server
        try {
          const serverResponse = await fetch(this.url, {
            method: 'GET',
            headers: {
              //   'Content-Type': 'application/json',
              'x-auth-token': window.localStorage.getItem('studentToken'),
            },
            // body: JSON.stringify(this.examStudentAnswerPayload),
          });
          const formattedResponse = await serverResponse.json();
          console.log(formattedResponse);
          const { userLoad } = formattedResponse;
          //building the ui from here

          $(this.mainView).append(`
            <div class="card-body main-card-view">
            <h5 class="card-title">${userLoad.first_name} ${userLoad.last_name}</h5>
            <p class="card-text">user id ${userLoad.id}</p>
            <p class="card-text">your id : ${userLoad.student_id}</p>
            <p class="card-text">email : ${userLoad.email}</p>
            <p class="card-text">phone Number : ${userLoad.student_phone_number}</p>
            <p class="card-text">department : ${userLoad.student_department}</p>
            <p class="card-text">Total Exams : ${userLoad.totalExamsSolvedByStudent} </p>               
            <p class="card-text">Exam Type : Practical Exam</p>               
            <a href="studentExamChecker.html" class="btn btn-primary">Check Solved Exams!</a>
            </div>
          `);

          resolve(formattedResponse);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      } else {
        reject(
          new Error(`you should provide url and view to call this service !`)
        );
      }
    });
  }
}

export { StudentProfileBuilderService };
