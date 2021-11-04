import { useState } from 'react';
import { useSelector } from 'react-redux'

import { useHistory, useParams } from 'react-router-dom'
import './ExamView.css'

import Button from '@mui/material/Button'
import LeftPanel from './LeftPanel'
import StudyAnswerOptions from './StudyAnswerOptions'
import ExamAnswerOptions from './ExamAnswerOptions'
import DialogBox from './DialogBox'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

function AnswerOptions({ mode, questionId, chooseMoreThanOne }){
    var optionArray = []
    optionArray = useSelector((state) => state.option)
    var optionObj = optionArray.find(optionObj => optionObj.questionId === questionId)

    if(mode === 'study')
        return <StudyAnswerOptions optionObj={optionObj} />
    
    if(mode === 'exam')
        return <ExamAnswerOptions optionObj={optionObj} chooseMoreThanOne={chooseMoreThanOne} />
}

const ExamView = () => {
    const [openDialogBox, setOpenDialogBox] = useState(false);
    const handleClickOpen = () => {
        setOpenDialogBox(true);
    }
    const handleClose = () => {
        setOpenDialogBox(false);
    }
    const handleConfirm = () => {
        history.push('/')
    }

    // function getReadyForScore(){
    //     getExamResult(selection)
    //     history.push('/score')
    // }

    const { mode, examNumber, questionNumber } = useParams()
    let history = useHistory()
    const questions = useSelector((state) => state.question)
    if(questions.length === 0){
        history.push('/')
        return false
    }
    const question = questions[questionNumber-1]

    return (
        <div className="main-container">
            <DialogBox open={openDialogBox} handleClose={handleClose} handleConfirm={handleConfirm} />
            <Button onClick={handleClickOpen} size="large" color="secondary" endIcon={<ExitToAppIcon />}>End Exam</Button>
            <div className="left-panel">
                <LeftPanel />
            </div>
            <div className="view-container center-self">
                <div className="top-indicator">
                    <h2 className="number">{questionNumber}/{questions.length}</h2>
                    <div className="tools">
                        {mode==='exam' ? <h2>00:00</h2> : ''}
                    </div>
                </div>

                <div className="question-text-holder">
                    <p>{question.text}</p>
                </div>

                <AnswerOptions mode={mode} questionId={question.questionId} chooseMoreThanOne={question.chooseMoreThanOne} />

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
                                if(parseInt(questionNumber)===questions.length && mode==='study'){
                                    handleClickOpen()
                                }
                                else if(parseInt(questionNumber)===questions.length && mode==='exam'){
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
