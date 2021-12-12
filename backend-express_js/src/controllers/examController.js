import Exam from '../models/examModel'
import Question from '../models/questionModel'
import Option from '../models/optionModel'
import Record from "../models/recordModel"
import { Op } from 'sequelize'
import sequelize from 'sequelize'

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

export const submitExam = async (req, res) => {
    console.log(req.body.selections)
    try{
        const questions = await Question.findAll({
            attributes: ['id'],
            where: {
                exam_id:req.body.examId
            }
        })

        const questionId = questions.map((question) => question.id)

        const options = await Option.findAll({
            attributes: ['id', 'correct'],
            where: {
                question_id: {
                    [Op.or]: questionId
                }
            }
        })

        var score = req.body.selections.reduce((currentScore, selection) => {
            if(selection !== null)
                return currentScore += options.find(op => op.id === selection).correct ? 1 : 0
            else{
                return currentScore
            }
        }, 0)

        const outOf = await Question.count({
            group: 'exam_id',
            where: {
                exam_id:req.body.examId
            }
        })
        // console.log(outOf[0].count)

        const newRecord = await Record.create({
            exam_id: req.body.examId,
            score: score,
            out_of: outOf[0].count,
            time_used: req.body.time,
            date: sequelize.fn('NOW')
        })
    }
    catch(err){
        console.log('ERR:', err)
    }
    finally{
        res.sendStatus(200)
    }
    
    // Question.findAll({
    //     attributes: ['id'],
    //     where: {
    //         exam_id:req.body.examId
    //     }
    // })
    // .then(questions => {
    //     let questionId = questions.map((question) => question.id)
        // Option.findAll({
        //     attributes: ['id', 'correct'],
        //     where: {
        //         question_id: {
        //             [Op.or]: questionId
        //         }
        //     }
        // })
    //     .then(options => {
    //         var score = 0
    //         for(let selection of req.body.selections){
    //             score += options.find(op => op.id === selection).correct ? 1 : 0
    //         }
    //         res.json(score)
    //     })
    //     .catch(err => console.log('ERR:', err))
    // })
    // .catch(err => console.log('ERR:', err))
}