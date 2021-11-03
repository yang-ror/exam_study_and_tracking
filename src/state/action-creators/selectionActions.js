export const setupSelection = (selectionArray) => {
    return (dispatch) => {
        dispatch({
            type: 'setupSelection',
            payload: selectionArray
        })
    }
}

export const saveAns = (answerObj) => {
    return (dispatch) => {
        dispatch({
            type: 'saveAns',
            payload: answerObj
        })
    }
}