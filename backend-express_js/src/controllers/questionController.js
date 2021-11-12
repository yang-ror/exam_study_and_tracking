import Question from '../models/questionModel'

export const getQuestions = (req, res) => {
    Question.findAll({
        where: {
            exam_id:req.params.examId
        }
    })
        .then(questions => res.json(questions))
        .catch(err => console.log('ERR:', err))
}

export const getQuestionsById = (req, res) => {
    Question.findAll({
        where: {
            id:req.params.questonId
        }
    })
    .then(questions => res.json(questions))
    .catch(err => console.log('ERR:', err))
}