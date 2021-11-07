const reducer = (state = [], action) => {
    switch (action.type) {
        case "setupQuestion":
            return state = action.payload
        default:
            return state
    }
}
export default reducer
