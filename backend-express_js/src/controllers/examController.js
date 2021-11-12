import Exam from '../models/examModel'

export const getExams = (req, res) => {
    Exam.findAll()
        .then(exams => res.json(exams))
        .catch(err => console.log('ERR:', err))
}

export const getExamById = (req, res) => {
    Exam.findAll({
        where: {
            id:req.params.examId
        }
    })
    .then(exam => res.json(exam))
    .catch(err => console.log('ERR:', err))
}