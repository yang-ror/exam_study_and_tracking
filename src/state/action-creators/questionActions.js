export const setupQuestion = (questions) => {
    return (dispatch) => {
        dispatch({
            type: 'setupQuestion',
            payload: questions
        })
    }
}

export const shuffleQuestions = () => {
    return (dispatch) => {
        dispatch({
            type: 'shuffleQuestions'
        })
    }
}