const {
    selectAllStudentExamQuestions,
    insertStudentExamQuestion,
    updateStudentExamQuestion,
    deleteStudentExamQuestion,
} = require('../quries/StudentExamQuestions.js');

module.exports.getAllStudentExamQuestionsController = async (req, res, next) => {
    try {
        const result = await selectAllStudentExamQuestions();
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err,
        });
    }
};

module.exports.insertStudentExamQuestionController = async (req, res, next) => {
    const { exam_id, student_id, question_id, answer } = req.body;

    if (exam_id && question_id) {
        try {
            const result = await insertStudentExamQuestion(exam_id, student_id, question_id, answer);
            res.status(201).json({
                success: true,
                data: result,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err,
            });
        }
    } else {
        res.status(500).json({
            success: false,
            message: 'error with req.param',
        });
    }
};

module.exports.updateStudentExamQuestionController = async (req, res, next) => {
    const { id, exam_id, student_id, question_id, answer } = req.body;

    if (id && exam_id && student_id && question_id && answer) {
        try {
            const result = await updateStudentExamQuestion(id, exam_id, student_id, question_id, answer);
            res.status(201).json({
                success: true,
                data: result,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err,
            });
        }
    } else {
        res.status(500).json({
            success: false,
            message: 'error with req.param',
        });
    }
};

module.exports.deleteStudentExamQuestionController = async (req, res, next) => {
    const id = req.params.id;
    if (id) {
        try {
            const result = await deleteStudentExamQuestion(id);
            res.status(201).json({
                success: true,
                data: result,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err,
            });
        }
    } else {
        res.status(500).json({
            success: false,
            message: 'error with req.param',
        });
    }
};
