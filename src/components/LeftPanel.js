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
    function goTo(){
        if(!data.inScore){
            data.history.push(`/e/${data.examNumber}/${data.mode}/${index+1}`)
        }
        else{
            data.history.push(`/e/${data.examNumber}/study/${index+1}`)
        }
    }

    var savedAnsLabel = ''

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
    else if(data.mode === 'exam'){
        for(let selection of data.saveAns){
            if(selection.questionId === data.questions[index].questionId){
                if(selection.selectionArray.length > 0){
                    savedAnsLabel = ' - ' + String.fromCharCode(selection.selectionArray[0] + 65)
                }
            }
        }
    }
    
    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={goTo}>
                <div className={`answered-questions ${parseInt(data.questionNumber)===index+1 && 'current-question'}`}>
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

    const { mode, examNumber, questionNumber } = useParams()
    const questions = useSelector((state) => state.question)
    const feedbacks = useSelector((state) => state.feedback)
    const selection = useSelector((state) => state.selection)

    var saveAns

    if(mode === 'study'){
        saveAns = feedbacks
    }
    else if(mode === 'exam'){
        saveAns = selection
    }
    
    const location = useLocation()
    var inScore = location.pathname === '/score'
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
                            inScore: inScore, 
                            history: history, 
                            openDialogBox: handleClickOpen, 
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
