import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { questionActionCreators, optionActionCreators, feedbackActionCreators, selectionActionCreators } from "../state/index"
import { getQuestions, getOptions } from '../api/getRequests'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'
import logo from '../logo.svg';
import './HomeView.css'
import ExamSelector from './ExamSelector'

const HomeView = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const { setupQuestion, shuffleQuestions } = bindActionCreators(questionActionCreators, dispatch)
    const { setupOption } = bindActionCreators(optionActionCreators, dispatch)
    const { setupFeedback } = bindActionCreators(feedbackActionCreators, dispatch)
    const { setupSelection } = bindActionCreators(selectionActionCreators, dispatch)

    function initializeExam(mode){
      if(selectedExam !== -1){
        let questions = []
        questions = getQuestions(selectedExam)
        setupQuestion(questions)

        let options = []
        options = getOptions(selectedExam)
        setupOption(options)

        if(mode === 'study'){
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
            history.push(`/e/${selectedExam}/study/1`)
        }

        else if(mode === 'exam'){
            questions = shuffleQuestions()
            let selectionObjArray = []
            for(let question of questions){
                let newSelectionObj = {
                    questionId: question.questionId,
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
        //TODO: prompt to select an exam
      }
    }
    
    var selectedExam = -1

    function setSelectedExam(num){
        selectedExam = num
    }

    return (
        <div className="main-container">
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
                        <Button disabled
                        // onClick={() => initializeExam('exam')} 
                        className="mode-select-btn" variant="contained" size="large">Exam Mode</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeView
