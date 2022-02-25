class ExamService {
  constructor(url, examStudentAnswerPayload) {
    this.url = url;
    this.examStudentAnswerPayload = examStudentAnswerPayload;
  }

  async start() {
    return new Promise(async (resolve, reject) => {
      if (this.url && this.examStudentAnswerPayload) {
        try {
          const serverResponse = await fetch(this.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': window.localStorage.getItem('studentToken'),
            },
            body: JSON.stringify(this.examStudentAnswerPayload),
          });
          const formattedResponse = await serverResponse.json();
          console.log(formattedResponse);
          resolve(formattedResponse);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(
          new Error(
            `u must provide the service url and examStudentAnswer payload to work`
          )
        );
      }
    });
  }
}

export { ExamService };
