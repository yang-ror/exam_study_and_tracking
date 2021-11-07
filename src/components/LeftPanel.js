import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { getAnswerKeys } from '../api/getRequests';
import DialogBox from './DialogBox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import './LeftPanel.css'

function renderRow({data, index, style }) {
    var savedAnsLabel = ''
    var inReview = data.mode === 'review'
    var correctAns = null
    if(data.mode === 'study'){
        for(let feedback of data.saveAns){
            if(feedback.questionId === index){
                const ansKey = getAnswerKeys(parseInt(data.examNumber), feedback.questionId)
                for(let i = 0; i < ansKey.length; i++){
                    if(ansKey[i].correct && feedback.feedbackArray[i].feedback){
                        savedAnsLabel = ' - ' + String.fromCharCode(i+65)
                    }
                }
            }
        }
    }
    else{
        for(let selection of data.saveAns){
            if(selection.questionId === data.questions[index]){
                if(selection.selectionArray.length > 0){
                    savedAnsLabel = ' - ' + String.fromCharCode(selection.selectionArray[0] + 65)
                }
            }
        }
        if(data.mode !== 'exam'){
            // activate review mode in score view.
            inReview = true
            
        }
        if(inReview){
            for(let selection of data.saveAns){
                if(selection.questionId === data.questions[index]){
                    const ansKey = getAnswerKeys(parseInt(data.examNumber), data.questions[index])
                    for(let i = 0; i < ansKey.length; i++){
                        if(ansKey[i].correct){
                            if(selection.selectionArray[0] === ansKey[i].optionId){
                                correctAns = true
                            }
                            else{
                                correctAns = false
                            }
                        }
                    }
                }
            }
        }
    }
    
    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={() => data.goTo(index)}>
                <div className={`answered-questions 
                ${inReview ? correctAns ? 'correct-ans-idx' : 'incorrect-ans-idx' : ''}
                ${parseInt(data.questionNumber)===index+1 && 'current-question'}`}>
                    <ListItemText primary={`# ${index+1} ${savedAnsLabel}`} />
                </div>
            </ListItemButton>
        </ListItem>
    )
}

const LeftPanel = () => {
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

    function goTo(index){
        var inScore = location.pathname.includes('/score')
        if(!inScore){
            history.push(`/e/${examNumber}/${mode}/${index+1}`)
        }
        else{
            history.push(`/e/${examNumber}/review/${index+1}`)
        }
    }

    const { mode, examNumber, questionNumber } = useParams()
    const questions = useSelector((state) => state.question)
    const feedbacks = useSelector((state) => state.feedback)
    const selection = useSelector((state) => state.selection)

    var saveAns

    if(mode === 'study'){
        saveAns = feedbacks
    }
    else{
        saveAns = selection
    }
    
    const location = useLocation()
    
    var history = useHistory()

    if(questions.length === 0){
        history.push('/')
        return false
    }

    return (
        <div className="panel">
            <DialogBox open={openDialogBox} handleClose={handleClose} handleConfirm={handleConfirm} />
            <AutoSizer>
                {({ height, width }) => (
                    <FixedSizeList
                        height={height}
                        width={width}
                        itemSize={46}
                        itemCount={questions.length}
                        overscanCount={5}
                        itemData={{ 
                            mode: mode,
                            questions: questions,
                            openDialogBox: handleClickOpen,
                            goTo:goTo,
                            examNumber:examNumber, 
                            questionNumber:questionNumber, 
                            saveAns:saveAns}}
                    >
                        {renderRow}
                    </FixedSizeList>
                )}
            </AutoSizer>
        </div>
    )
}

export default LeftPanel
