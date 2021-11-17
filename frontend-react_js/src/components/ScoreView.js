import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogBox from './DialogBox'
import LeftPanel from './LeftPanel'
import './ScoreView.css'

const ScoreView = () => {
    const [openDialogBox, setOpenDialogBox] = useState(false)

    const handleClickOpen = () => {
        setOpenDialogBox(true)
    }
    const handleClose = () => {
        setOpenDialogBox(false)
    }
    const handleConfirm = () => {
        history.push('/')
    }

    function goToReview(){
        history.push(`/e/${examNumber}/review/1`)
    }

    let history = useHistory()

    const { examNumber } = useParams()
    const selection = useSelector((state) => state.selection)
    const questions = useSelector((state) => state.question)

    var selectionToSubmid = []
    for(let s of selection){
        selectionToSubmid.push(s.selectionArray[0])
    }

    var submition = {
        examId: examNumber,
        selections: selectionToSubmid
    }

    const [score, setScore] = React.useState(0)
    React.useEffect(() => {
        const getScore = async () => {
            const res = await fetch('/result/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submition)
            })
            var json = await res.json()
            setScore(json)
        }
        getScore()
    },[])

    return (
        <div className="main-container">
            <DialogBox open={openDialogBox} handleClose={handleClose} handleConfirm={handleConfirm} />
                <div className="left-panel">
                    <LeftPanel />
                </div>
            <div className="view-container center-self flex-center-content-x">
                <div className="score-holder">
                    <h1>{score}/{questions.length}</h1>
                </div>

                <Box className="current-progress center-self-x" sx={{ width: '90%' }}>
                    <LinearProgress variant="determinate" value={score / questions.length * 100} />
                </Box>
                
                <div className="question-btns-holder">
                        <div className="question-btn-holder">
                            <Button className='question-btn' variant="contained" color="success"
                                onClick={goToReview}
                            >
                                Review
                            </Button>
                        </div>
                        <div className="question-btn-holder">
                            <Button className='question-btn' variant="contained"
                                onClick={handleClickOpen}
                            >
                                End
                            </Button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ScoreView
