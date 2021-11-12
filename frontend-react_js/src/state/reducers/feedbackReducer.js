const reducer = (state = [], action) => {
    switch (action.type) {
        case "setupFeedback":
            return state = action.payload
        case "setFeedback":
            return state = setFeedback(state, action.payload)
        default:
            return state
    }

    function setFeedback(state, payload){
        var newState = state
        for(let i = 0; i < newState.length; i++){
            if(newState[i].questionId === payload.questionId){
                for(let j = 0; j < newState[i].feedbackArray.length; j++){
                    if(newState[i].feedbackArray[j].optionId === payload.optionId){
                        newState[i].feedbackArray[j].feedback = true
                    }
                }
            }
        }
        return newState
    }
}

export default reducer
