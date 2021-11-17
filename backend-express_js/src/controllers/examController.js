import Exam from '../models/examModel'
import Question from '../models/questionModel'
import Option from '../models/optionModel'
import { Op } from 'sequelize'

export const getExams = (req, res) => {
    Exam.findAll()
        .then(exams => res.json(exams))
        .catch(err => console.log('ERR:', err))
}

export const getExamById = (req, res) => {
    Exam.findOne({
        where: {
            id:req.params.examId
        }
    })
    .then(exam => res.json(exam))
    .catch(err => console.log('ERR:', err))
}

export const getResult = (req, res) => {
    Question.findAll({
        attributes: ['id'],
        where: {
            exam_id:req.body.examId
        }
    })
    .then(questions => {
        let questionId = questions.map((question) => question.id)
        Option.findAll({
            attributes: ['id', 'correct'],
            where: {
                question_id: {
                    [Op.or]: questionId
                }
            }
        })
        .then(options => {
            var score = 0
            for(let selection of req.body.selections){
                score += options.find(op => op.id === selection).correct ? 1 : 0
            }
            res.json(score)
        })
        .catch(err => console.log('ERR:', err))
    })
    .catch(err => console.log('ERR:', err))
}