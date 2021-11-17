import { getOptions, getAllOptionIds, getOptionIds, getAnswerKey, getAnswerKeys, getAllAnswerKeys } from "../controllers/optionController"

const routes = app => {
    app.route('/options/:questionId')
        .get(getOptions)
    app.route('/alloptionids/:examId')
        .get(getAllOptionIds)
    app.route('/optionids/:questionId')
        .get(getOptionIds)
    app.route('/allanswerkeys/:examId')
        .get(getAllAnswerKeys)
    app.route('/answerkeys/:questionId')
        .get(getAnswerKeys)
    app.route('/answerkey/:optionId')
        .get(getAnswerKey)
}

export default routes