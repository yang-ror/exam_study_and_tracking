import Record from "../models/recordModel"

// export const addRecord = (req, res) => {
    // Record.create({
    //     exam_id: '',
    //     score: '',
    //     out_of: '',
    //     time_used: '',
    //     date: ''
    // })
//     .then(exam => res.json(exam))
//     .catch(err => console.log('ERR:', err))
// }

export const getRecord = (req, res) => {
    Record.findAll({
        where: {
            exam_id:req.params.examId
        }
    })
    .then(exam => res.json(exam))
    .catch(err => console.log('ERR:', err))
}

export const getRecords = (req, res) => {
    Record.findAll()
    .then(exam => res.json(exam))
    .catch(err => console.log('ERR:', err))
}