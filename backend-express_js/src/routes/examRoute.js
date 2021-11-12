import { getExams, getExamById } from "../controllers/examController"

const routes = app => {
    app.route('/exams')
        .get(getExams)
    
    app.route('/exam/:examId')
        .get(getExamById)
}

export default routes