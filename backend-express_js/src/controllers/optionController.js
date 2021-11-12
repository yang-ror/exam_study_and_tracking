import Option from '../models/optionModel'

export const getOptions = (req, res) => {
    Option.findAll({
        attributes: ['id', 'text_id', 'text'],
        where: {
            question_id:req.params.questionId
        }
    })
    .then(options => res.json(options))
    .catch(err => console.log('ERR:', err))
}

export const getAnswerKey = (req, res) => {
    Option.findAll({
        attributes: ['correct'],
        where: {
            id:req.params.optionId
        }
    })
    .then(options => res.json(options))
    .catch(err => console.log('ERR:', err))
}