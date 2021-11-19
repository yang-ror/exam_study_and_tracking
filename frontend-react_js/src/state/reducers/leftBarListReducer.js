const reducer = (state = [], action) => {
    switch(action.type) {
        case "setupLeftBarList":
            return state = action.payload
        case "updateList":
            return state = updateList(state, action.payload, 'all')
        case "updateSavedAns":
            return state = updateList(state, action.payload, 'ans')
        case "updateStatus":
            return state = updateList(state, action.payload, 'status')
        default:
            return state
    }

    function updateList(state, payload, updateOn){
        var newState = state
        for(let i = 0; i < newState.length; i++){
            if(newState[i].questionId === payload.questionId){
                if(updateOn === 'all')
                    newState[i] = payload
                else if(updateOn === 'ans')
                    newState[i] = { ...newState[i], savedAns: payload.savedAns }
                else if(updateOn === 'status')
                    newState[i] = { ...newState[i], status: payload.status }
                break
            }
            
        }
        return newState
    }
}

export default reducer