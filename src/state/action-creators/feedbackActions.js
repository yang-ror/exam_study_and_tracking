export const setupFeedback = (feedbackArray) => {
    return (dispatch) => {
        dispatch({
            type: 'setupFeedback',
            payload: feedbackArray
        })
    }
}

export const setFeedback = (indexes) => {
    return (dispatch) => {
        dispatch({
            type: 'setFeedback',
            payload: indexes
        })
    }
}