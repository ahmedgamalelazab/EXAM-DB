class ExamCorrectionService {
  constructor(studentAnswerModel, examModelAnswers) {
    this.studentAnswerModel = studentAnswerModel;
    this.examModelAnswers = examModelAnswers;
  }

  async start() {
    let totalExamStudentPoints = 0;
    let examFullMark = 0;
    return new Promise(async (resolve, reject) => {
      if (this.studentAnswerModel && this.examModelAnswers) {
        //loop using the index and inject this index with the examModel and then compare
        //if the params ok then lets loop
        this.studentAnswerModel.forEach((studentModelAnswer, index) => {
          if (
            studentModelAnswer.student_answer.toLowerCase() ===
            this.examModelAnswers[index].answer.toLowerCase()
          ) {
            console.log(studentModelAnswer.student_answer);
            console.log(this.examModelAnswers[index].answer);
            console.log(this.examModelAnswers[index].question_points);
            totalExamStudentPoints +=
              this.examModelAnswers[index].question_points;
          }
          //else
          // no more points
          examFullMark += this.examModelAnswers[index].question_points;
        });
        //after looping console the result
        console.log(totalExamStudentPoints);
        resolve({
          studentMark: totalExamStudentPoints,
          examFullMark: examFullMark,
        });
      } else {
        reject(
          new Error(
            `u must Provide Exam Model answer and student model to correct the exam`
          )
        );
      }
    });
  }
}

export { ExamCorrectionService };
