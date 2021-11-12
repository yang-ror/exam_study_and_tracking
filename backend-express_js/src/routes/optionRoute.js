import { getOptions, getAnswerKey } from "../controllers/optionController"

const routes = app => {
    app.route('/options/:questionId')
        .get(getOptions)
    app.route('/answerkey/:optionId')
        .get(getAnswerKey)
}

export default routes