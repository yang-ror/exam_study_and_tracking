import React from 'react';
import { useState } from 'react';
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { feedbackActionCreators } from "../state/index"
import { getQuestion, getOption } from '../api/getRequests'
import { useHistory, useParams } from 'react-router-dom'
import { getAnswerKeys } from '../api/getRequests'
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

function AnswerOptions({ mode, examId, questionId, chooseMoreThanOne }){
    var optionObj = getOption(examId, questionId)
    if(mode === 'study' || mode === 'review')
        return <StudyAnswerOptions optionObj={optionObj} />
    if(mode === 'exam')
        return <ExamAnswerOptions optionObj={optionObj} chooseMoreThanOne={chooseMoreThanOne} />
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
    const dispatch = useDispatch()
    const selection = useSelector((state) => state.selection)
    const { setFeedback } = bindActionCreators(feedbackActionCreators, dispatch)

    const [openDialogBox, setOpenDialogBox] = useState(false);
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

    const { mode, examNumber, questionNumber } = useParams()
    let history = useHistory()
    const questions = useSelector((state) => state.question)

    if(questions.length === 0){
        history.push('/')
        return false
    }

    const question = getQuestion(parseInt(examNumber), questions[questionNumber-1])

    function showTranslation(){
    }

    function setupReview(){
        
        for(let s of selection){
            setFeedback({
                questionId: s.questionId,
                optionId: s.selectionArray[0]
            },[])
            const answerKeys  = getAnswerKeys(parseInt(examNumber), s.questionId)
            for(let ansKey of answerKeys){
                if(ansKey.correct){
                    setFeedback({
                        questionId: s.questionId,
                        optionId: ansKey.optionId
                    },[])
                }
            }
        }
    }

    return (
        <div className="main-container">
            <DialogBox open={openDialogBox} handleClose={handleClose} handleConfirm={handleConfirm} />
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
                    {question.imageName !== '' && <img src={process.env.PUBLIC_URL + '/images/' + question.imageName + '.png'} alt='question img' /> }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleImageClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Button onClick={handleClickOpen} size="large" color="secondary" endIcon={<ExitToAppIcon />}>End Exam</Button>
            <div className="left-panel">
                <LeftPanel />
            </div>
            <div className="view-container center-self">
                <div className="top-indicator">
                    <h2 className="number">{questionNumber}/{questions.length}</h2>
                    <div className="tools">
                        {
                            mode==='exam' ? <Timer /> :
                            <IconButton onClick={showTranslation} color="primary" aria-label="show image" component="span">
                                <TranslateIcon />
                            </IconButton>
                        }
                    </div>
                </div>

                <div className="question-text-holder">
                    <p>{question.text}</p>
                    {question.imageName !== '' && <Button onClick={handleImageClickOpen} variant="outlined" color="secondary" size="small">Show Image</Button>}
                </div>

                <AnswerOptions mode={mode} examId={parseInt(examNumber)} questionId={question.questionId} chooseMoreThanOne={question.chooseMoreThanOne} />

                <div className="question-btns-holder">
                    <div className="question-btn-holder">
                        <Button className='question-btn' variant="contained" color="success"
                            onClick={() => 
                                parseInt(questionNumber)===1 ? handleClickOpen() : 
                                history.push(`/e/${examNumber}/${mode}/${parseInt(questionNumber)-1}`)
                            } 
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
