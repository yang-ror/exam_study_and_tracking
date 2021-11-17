import Question from '../models/questionModel'
import Option from '../models/optionModel'
import { Op } from 'sequelize'

export const getOptions = (req, res) => {
    Option.findAll({
        attributes: ['id', 'text_id', 'text'],
        where: {
            question_id: req.params.questionId
        }
    })
    .then(options => res.json(options))
    .catch(err => console.log('ERR:', err))
}

export const getAllOptionIds = (req, res) => {
    Question.findAll({
        attributes: ['id'],
        where: {
            exam_id:req.params.examId
        }
    })
    .then(questions => {
        let questionId = questions.map((question) => question.id)
        Option.findAll({
            attributes: ['id', 'question_id'],
            where: {
                question_id: {
                    [Op.or]: questionId
                }
            }
        })
        .then(options => {
            res.json(options)
        })
        .catch(err => console.log('ERR:', err))
    })
    .catch(err => console.log('ERR:', err))
}

export const getOptionIds = (req, res) => {
    Option.findAll({
        attributes: ['id'],
        where: {
            question_id: req.params.questionId
        }
    })
    .then(options => res.json(options))
    .catch(err => console.log('ERR:', err))
}

export const getAllAnswerKeys = (req, res) => {
    Question.findAll({
        attributes: ['id'],
        where: {
            exam_id:req.params.examId
        }
    })
    .then(questions => {
        let questionId = questions.map((question) => question.id)
        Option.findAll({
            attributes: ['id', 'question_id', 'correct'],
            where: {
                question_id: {
                    [Op.or]: questionId
                }
            }
        })
        .then(options => {
            res.json(options)
        })
        .catch(err => console.log('ERR:', err))
    })
    .catch(err => console.log('ERR:', err))
}

export const getAnswerKeys = (req, res) => {
    Option.findAll({
        attributes: ['id', 'correct'],
        where: {
            question_id: req.params.questionId
        }
    })
    .then(options => res.json(options))
    .catch(err => console.log('ERR:', err))
}

export const getAnswerKey = (req, res) => {
    Option.findOne({
        attributes: ['correct'],
        where: {
            id: req.params.optionId
        }
    })
    .then(options => res.json(options))
    .catch(err => console.log('ERR:', err))
}