export const setupLeftBarList = (leftBarList) => {
    return (dispatch) => {
        dispatch({
            type: 'setupLeftBarList',
            payload: leftBarList
        })
    }
}

export const updateList = (updates) => {
    return (dispatch) => {
        dispatch({
            type: 'updateList',
            payload: updates
        })
    }
}

export const updateSavedAns = (updates) => {
    return (dispatch) => {
        dispatch({
            type: 'updateSavedAns',
            payload: updates
        })
    }
}

export const updateStatus = (updates) => {
    return (dispatch) => {
        dispatch({
            type: 'updateStatus',
            payload: updates
        })
    }
}