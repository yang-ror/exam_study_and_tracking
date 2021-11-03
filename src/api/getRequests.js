import fakeDatabase from "./fakeDatabase"

export const getAnswerKeys = (examId, questionId) => {
    for(let exam of fakeDatabase.LawExam){
        if(exam.examId === examId){
            for(let ansKey of exam.answerKey){
                if(ansKey.questionId === questionId){
                    return ansKey.options
                }
            }
        }
    }
}

export const getQuestions = examId => {
    for(let exam of fakeDatabase.LawExam){
        if(exam.examId === examId){
            return exam.question
        }
    }
}

export const getOptions = examId => {
    for(let exam of fakeDatabase.LawExam){
        if(exam.examId === examId){
            return exam.answer
        }
    }
}

export const getExams = () => {
    var exams = []
    for(let exam of fakeDatabase.LawExam){
        exams.push({
          examId: exam.examId,
          examName: exam.examName
        })
    }
    return exams
}