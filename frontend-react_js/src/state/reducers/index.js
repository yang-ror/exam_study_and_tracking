import { combineReducers } from 'redux'
import questionReducer from './questionReducer'
import feedbackReducer from './feedbackReducer'
import selectionReducer from './selectionReducer'
import leftBarListReducer from './leftBarListReducer'

const reducers = combineReducers({
    question: questionReducer,
    feedback: feedbackReducer,
    selection: selectionReducer,
    leftBarList: leftBarListReducer
})

export default reducers