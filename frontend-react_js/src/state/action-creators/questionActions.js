export const setupQuestion = (questions) => {
    return (dispatch) => {
        dispatch({
            type: 'setupQuestion',
            payload: questions
        })
    }
}