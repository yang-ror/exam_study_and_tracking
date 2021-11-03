export const setupOption = (options) => {
    return (dispatch) => {
        dispatch({
            type: 'setupOption',
            payload: options
        })
    }
}