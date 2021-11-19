const reducer = (state = [], action) => {
    switch (action.type) {
        case "setupSelection":
            return state = action.payload
        case "saveAns":
            return state = saveAns(state, action.payload)
        default:
            return state
            
    }

    function saveAns(state, payload){
        var newState = state
        for(let i = 0; i < newState.length; i++){
            if(newState[i].questionId === payload.questionId){
                newState[i].selectionArray = payload.selectedOption
                break
            }
        }
        return newState
    }
}

export default reducer
