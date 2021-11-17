import { getExams, getExamById, getResult } from "../controllers/examController"

const routes = app => {
    app.route('/exams')
        .get(getExams)
    app.route('/exam/:examId')
        .get(getExamById)
    app.route('/result/')
        .post(getResult)
}

export default routes