import React from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { feedbackActionCreators } from "../state/index"
import { useHistory, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TranslateIcon from '@mui/icons-material/Translate'
import DialogBox from './DialogBox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import LeftPanel from './LeftPanel'
import StudyAnswerOptions from './StudyAnswerOptions'
import ExamAnswerOptions from './ExamAnswerOptions'
import Timer from './Timer'
import './ExamView.css'

function AnswerOptions({ mode, questionId, chooseMoreThanOne }){
    const [optionObject, setOptionObject] = React.useState(null)
    React.useEffect(() => {
        const getOptions = async () => {
            const res = await fetch('/options/' + questionId)
            var options = await res.json()
            var newOptionObj = {
                questionId: questionId,
                options: options,
                chooseMoreThanOne: chooseMoreThanOne
            }
            setOptionObject(newOptionObj)
        }
        getOptions()
    },[questionId])

    if(optionObject !== null){
        if(mode === 'study' || mode === 'review')
            return <StudyAnswerOptions optionObj={optionObject} />
        if(mode === 'exam')
            return <ExamAnswerOptions optionObj={optionObject} />
    }
    else{
        return <label className="center-self">loading...</label>
    }
}

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    )
}

const ExamView = () => {
    let history = useHistory()
    const questions = useSelector((state) => state.question)
    const { mode, examNumber, questionNumber } = useParams()
    const [question, setQuestion] = React.useState(null)
    React.useEffect(() => {
        const getQuestion = async () => {
            const res = await fetch('/question/' + questions[questionNumber-1])
            var json = await res.json()
            setQuestion(json)
        }
        getQuestion()
    },[questionNumber])

    const [examName, setExamName] = React.useState('')
    React.useEffect(() => {
        const getQuestion = async () => {
            const res = await fetch('/exam/' + examNumber)
            var json = await res.json()
            setExamName(json.exam_name)
        }
        getQuestion()
    },[])

    const dispatch = useDispatch()
    const selection = useSelector((state) => state.selection)
    const { setFeedback } = bindActionCreators(feedbackActionCreators, dispatch)

    const [openDialogBox, setOpenDialogBox] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDialogBox(true)
    }
    const handleClose = () => {
        setOpenDialogBox(false)
    }
    const handleConfirm = () => {
        history.push('/')
    }

    const [open, setOpen] = React.useState(false);

    const handleImageClickOpen = () => {
      setOpen(true)
    }
  
    const handleImageClose = () => {
      setOpen(false)
    }

    if(questions.length === 0){
        history.push('/')
    }

    function showTranslation(){
    }

    async function setupReview(){
        for(let s of selection){
            setFeedback({
                questionId: s.questionId,
                optionId: s.selectionArray[0]
            },[])
        }

        const res = await fetch('/allanswerkeys/' + examNumber)
        const answerKeys = await res.json()
        for(let ak of answerKeys){
            if(ak.correct){
                setFeedback({
                    questionId: ak.question_id,
                    optionId: ak.id
                },[])
            }
        }
    }

    return (
        <div className="main-container">
            <DialogBox open={openDialogBox} handleClose={handleClose} handleConfirm={handleConfirm} />
            {question!==null && question.image_name !== '' &&
                <Dialog
                    open={open}
                    maxWidth={'md'}
                    fullWidth={false}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"></DialogTitle>
                    <DialogContent>
                        {<img src={process.env.PUBLIC_URL + '/images/' + question.image_name + '.png'} alt='question img' /> }
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleImageClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            }
            <Button onClick={handleClickOpen} size="large" color="secondary" endIcon={<ExitToAppIcon />}>End Exam</Button>
            <div className="left-panel">
                <LeftPanel />
            </div>
            <div className="view-container center-self">
                <div className="top-indicator">
                    <h2 className="number">{questionNumber}/{questions.length}</h2>
                    <h2 className="exam-name center-self-x">{examName}</h2>
                    <div className="tools">
                        {
                            mode==='exam' ? <Timer /> :
                            <IconButton onClick={showTranslation} color="primary" aria-label="show image" component="span">
                                <TranslateIcon />
                            </IconButton>
                        }
                    </div>
                </div>
                {question!==null && 
                <>
                    <div className="question-text-holder">
                        <p>{question.text}</p>
                        {question.image_name !== '' && <Button onClick={handleImageClickOpen} variant="outlined" color="secondary" size="small">Show Image</Button>}
                    </div>
                    <AnswerOptions mode={mode} examId={parseInt(examNumber)} questionId={question.id} chooseMoreThanOne={question.choose_more_than_one} />
                </>
                }
                <div className="question-btns-holder">
                    <div className="question-btn-holder">
                        <Button className='question-btn' variant="contained" color="success"
                            onClick={() => {
                                if(parseInt(questionNumber)===1){
                                    handleClickOpen()
                                } 
                                else {
                                    history.push(`/e/${examNumber}/${mode}/${parseInt(questionNumber)-1}`)
                                }
                            }}
                        >
                            Back
                        </Button>
                    </div>
                    <div className="question-btn-holder">
                        <Button className='question-btn' variant="contained"
                            onClick={() => {
                                if(parseInt(questionNumber)===questions.length && (mode==='study' || mode==='review')){
                                    handleClickOpen()
                                }
                                else if(parseInt(questionNumber)===questions.length && mode==='exam'){
                                    setupReview()
                                    history.push(`/score/${examNumber}`)
                                }
                                else{
                                    history.push(`/e/${examNumber}/${mode}/${parseInt(questionNumber)+1}`)
                                }
                            }}
                        >
                            {parseInt(questionNumber)===questions.length ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamView
