import { getQuestions, getQuestionsById } from "../controllers/questionController"

const routes = app => {
    app.route('/questions/:examId')
        .get(getQuestions)
    app.route('/question/:questonId')
        .get(getQuestionsById)
}

export default routes