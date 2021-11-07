import { combineReducers } from 'redux'
import questionReducer from './questionReducer'
import feedbackReducer from './feedbackReducer'
import selectionReducer from './selectionReducer'

const reducers = combineReducers({
    question: questionReducer,
    feedback: feedbackReducer,
    selection: selectionReducer
})

export default reducers