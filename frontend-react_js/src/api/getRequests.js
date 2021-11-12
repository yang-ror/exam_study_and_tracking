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

export const getQuestion = (examId, questionId) => {
    for(let exam of fakeDatabase.LawExam){
        if(exam.examId === examId){
            for(let question of exam.question){
                if(question.questionId === questionId){
                    return question
                }
            }
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

export const getOption = (examId, questionId ) => {
    for(let exam of fakeDatabase.LawExam){
        if(exam.examId === examId){
            for(let ans of exam.answer){
                if(ans.questionId === questionId){
                    return ans
                }
            }
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

export const getExamResult = (examId, selection) =>{
    var score = 0
    for(let s of selection){
        const ansKey = getAnswerKeys(examId, s.questionId)
        for(let opt of ansKey){
            if(opt.correct && s.selectionArray[0] === opt.optionId){
                score++
            }
        }
    }
    return score
}