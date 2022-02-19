const {
    selectAllQuestions,
    insertQuestion,
    updateQuestion,
    deleteQuestion,
} = require('../quries/Question.js');

module.exports.getAllQuestionsController = async (req, res, next) => {
    try {
        const result = await selectAllQuestions();
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

module.exports.insertQuestionController = async (req, res, next) => {
    const { name, question_type_id, correct_answer } = req.body;

    if (name && question_type_id && correct_answer) {
        try {
            const result = await insertQuestion(name, question_type_id, correct_answer);
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

module.exports.updateQuestionController = async (req, res, next) => {
    const { id, name, question_type_id, correct_answer } = req.body;

    if (id && name && question_type_id && correct_answer) {
        try {
            const result = await updateQuestion(id, name, question_type_id, correct_answer);
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

module.exports.deleteQuestionController = async (req, res, next) => {
    const id = req.params.id;

    if (id) {
        try {
            const result = await deleteQuestion(id);
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
