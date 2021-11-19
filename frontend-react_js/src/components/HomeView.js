import * as React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
    questionActionCreators, 
    feedbackActionCreators, 
    selectionActionCreators, 
    leftBarActionCreators 
} from '../state/index'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import logo from '../logo.svg'
import ExamSelector from './ExamSelector'
import './HomeView.css'


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
    const { setupLeftBarList } = bindActionCreators(leftBarActionCreators, dispatch)

    function setupLeftBar(questions){
        var leftBarList = questions.map((question) => {
            return {
                questionId: question,
                savedAns: '',
                status: 'unanswered'
            }
        })
        setupLeftBarList(leftBarList)
    }

    async function initializeExam(mode){
        if(selectedExam !== -1){
            var questions = []
            const resOfQuestions = await fetch('questions/' + selectedExam)
            const questionObjs = await resOfQuestions.json()
            let feedbackObjArray = []

            const resOfOptIds = await fetch('alloptionids/' + selectedExam)
            const optionObjs = await resOfOptIds.json()
            let feedbackArray = []

            for(let question of questionObjs){
                questions.push(question.id)
                for(let option of optionObjs){
                    if(option.question_id === question.id){
                        feedbackArray.push({
                            optionId: option.id,
                            feedback: false
                        })
                    }
                }
                let newFeedbackArray = {
                    questionId: question.id,
                    feedbackArray: feedbackArray
                }
                feedbackObjArray.push(newFeedbackArray)
            }
            setupFeedback(feedbackObjArray)

            if(mode === 'study'){
                setupQuestion(questions)
                setupLeftBar(questions)
                history.push(`/e/${selectedExam}/study/1`)
            }

            else if(mode === 'exam'){
                questions = shuffle(questions)
                setupQuestion(questions)
                setupLeftBar(questions)
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
            setState({ open: true, vertical: 'bottom', horizontal: 'center' })
        }
    }
    
    const [selectedExam, setSelectedExam] = React.useState(-1)
    // var selectedExam = -1
    // function setSelectedExam(num){
    //     selectedExam = num
    // }

    const [exams, setExams] = React.useState([])

    React.useEffect(() => {
        const getExams = async () => {
            const res = await fetch('/exams')
            var json = await res.json()
            setExams(json)
        }
        getExams()
    }, [])

    return (
        <div className="main-container">
            <Snackbar 
                anchorOrigin={{ vertical, horizontal }} 
                open={open} autoHideDuration={6000} 
                onClose={handleClose} 
                key={vertical + horizontal}
                // onClick={history.push('/score/0')}
            >
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Select an exam to continue.
                </Alert>
            </Snackbar>
            <div className="view-container center-self flex-center-content-x">
                <div className="logo-holder"><img src={logo} className="App-logo" alt="logo" /></div>
                <div className="exam-selector">
                    <ExamSelector exams={exams} setSelectedExam={setSelectedExam} />
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
                {selectedExam !== -1 &&
                    <div className="history-btn">
                        <Button onClick={() => history.push(`/score/${selectedExam}`)} size="large" color="secondary">See History</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default HomeView
