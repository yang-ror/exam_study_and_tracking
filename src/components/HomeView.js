import * as React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { questionActionCreators, feedbackActionCreators, selectionActionCreators } from '../state/index'
import { getQuestions, getOptions } from '../api/getRequests'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import logo from '../logo.svg'
import './HomeView.css'
import ExamSelector from './ExamSelector'

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const HomeView = () => {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })

    const { vertical, horizontal, open } = state;
    
    const handleClose = () => {
        setState({ ...state, open: false })
    }

    let history = useHistory();
    const dispatch = useDispatch()
    const { setupQuestion } = bindActionCreators(questionActionCreators, dispatch)
    const { setupFeedback } = bindActionCreators(feedbackActionCreators, dispatch)
    const { setupSelection } = bindActionCreators(selectionActionCreators, dispatch)

    function initializeExam(mode){
        if(selectedExam !== -1){
            var questions = []
            var questionsObjs = getQuestions(selectedExam)
            for(let queObj of questionsObjs){
                questions.push(queObj.questionId)
            }

            const options = getOptions(selectedExam)
            let feedbackObjArray = []
            for(let optionObj of options){
                let feedbackArray = []
                for(let option of optionObj.options){
                    feedbackArray.push({
                        optionId: option.optionId,
                        feedback: false
                    })
                }
                let newFeedbackArray = {
                    questionId: optionObj.questionId,
                    feedbackArray: feedbackArray
                }
                feedbackObjArray.push(newFeedbackArray)
            }
            setupFeedback(feedbackObjArray)

            if(mode === 'study'){
                setupQuestion(questions)
                history.push(`/e/${selectedExam}/study/1`)
            }

            else if(mode === 'exam'){
                questions = shuffle(questions)
                setupQuestion(questions)
                
                let selectionObjArray = []
                for(let questionId of questions){
                    let newSelectionObj = {
                        questionId: questionId,
                        selectionArray: []
                    }
                    selectionObjArray.push(newSelectionObj)
                }
                setupSelection(selectionObjArray)
                history.push(`/e/${selectedExam}/exam/1`)
            }

            else{
                history.push('/')
            }
        }
        else{
            setState({ open: true, vertical: 'bottom', horizontal: 'center'})
        }
    }
    
    var selectedExam = -1
    function setSelectedExam(num){
        selectedExam = num
    }

    return (
        <div className="main-container">
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Select an exam to continue.
                </Alert>
            </Snackbar>
            <div className="view-container center-self flex-center-content-x">
                <div className="logo-holder"><img src={logo} className="App-logo" alt="logo" /></div>
                <div className="exam-selector">
                    <ExamSelector setSelectedExam={setSelectedExam} />
                </div>
                <div className="btn-holders">
                    <div className="btn-holder">
                        <Button onClick={() => initializeExam('study')} className="mode-select-btn" variant="contained" size="large" color="success">Study Mode</Button>
                    </div>
                    <div className="btn-holder">
                        <Button 
                        onClick={() => initializeExam('exam')} 
                        className="mode-select-btn" variant="contained" size="large">Exam Mode</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeView
