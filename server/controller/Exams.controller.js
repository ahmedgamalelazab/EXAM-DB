const {
    selectAllExams,
    insertExam,
    updateExam,
    deleteExam,
} = require('../quries/Exams.js');

module.exports.getAllExamsController = async (req, res, next) => {
    try {
        const result = await selectAllExams();
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

module.exports.insertExamController = async (req, res, next) => {
    const { exam_name, duration, total_marks, instructor_id } = req.body;

    if (exam_name && duration && total_marks && instructor_id) {
        try {
            const result = await insertExam(exam_name, duration, total_marks, instructor_id);
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

module.exports.updateExamController = async (req, res, next) => {
    const { id, exam_name, duration, total_marks, instructor_id } = req.body;

    if (id && exam_name && duration && total_marks && instructor_id) {
        try {
            const result = await updateExam(id, exam_name, duration, total_marks, instructor_id);
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

module.exports.deleteExamController = async (req, res, next) => {
    const id = req.params.id;

    if (id) {
        try {
            const result = await deleteExam(id);
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
