import { getExams, getExamById, submitExam } from "../controllers/examController"

const routes = app => {
    app.route('/exams')
        .get(getExams)
    app.route('/exam/:examId')
        .get(getExamById)
    app.route('/submit/')
        .post(submitExam)
}

export default routes