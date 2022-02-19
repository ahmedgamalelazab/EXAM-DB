const {
    selectAllAnswers,
    insertAnswer,
    updateAnswer,
    deleteAnswer,
} = require('../quries/Answers.js');

module.exports.getAllAnswersController = async (req, res, next) => {
    try {
        const result = await selectAllAnswers();
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

module.exports.insertAnswerController = async (req, res, next) => {
    const { answer_one, answer_two, answer_three, answer_four, question_id } = req.body;

    if (answer_one && answer_two && answer_three && answer_four &&
        question_id) {
        try {
            const result = await insertAnswer(answer_one, answer_two, answer_three, answer_four, question_id);
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

module.exports.updateAnswerController = async (req, res, next) => {
    const { id, answer_one, answer_two,
        answer_three, answer_four, question_id } = req.body;

    if (id && answer_one && answer_two && answer_three && answer_four &&
        question_id) {
        try {
            const result = await updateAnswer(id, answer_one, answer_two,
                answer_three, answer_four, question_id);
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

module.exports.deleteAnswerController = async (req, res, next) => {
    const id = req.params.id;

    if (id) {
        try {
            const result = await deleteAnswer(id);
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
