import { combineReducers } from 'redux'
import questionReducer from './questionReducer'
import optionReducer from './optionReducer'
import feedbackReducer from './feedbackReducer'
import selectionReducer from './selectionReducer'

const reducers = combineReducers({
    question: questionReducer,
    option: optionReducer,
    feedback: feedbackReducer,
    selection: selectionReducer
})

export default reducers