import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import DialogBox from './DialogBox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import './LeftPanel.css'

function renderRow({ data, index, style }) {
    // var inReview = data.mode === 'review'
    // var correct = null

    // if(data.mode === 'study'){
        // if(data.answerKeys.length > 0){
            // var feedbackArray = data.saveAns.find(fb => fb.questionId === data.questions[index]).feedbackArray
            // for(let fb of feedbackArray){
            //     if(fb.feedback){
            //         var answerKey = data.answerKeys.find(ak => ak.id === fb.optionId)
            //         if(answerKey.correct){
            //             savedAnsLabel = ' - ' + String.fromCharCode(fb.optionId % 4 + 65)
            //         }
            //     }
            // }
        // }
    // }
    // else{
        // for(let selection of data.saveAns){
        //     if(selection.questionId === data.questions[index]){
        //         if(selection.selectionArray.length > 0){
        //             savedAnsLabel = ' - ' + String.fromCharCode(selection.selectionArray[0] % 4 + 65)
        //         }
        //     }
        // }
        // var selection = data.saveAns.find(s => s.questionId === data.questions[index])

        // if(data.mode !== 'exam'){
        //     // activate review mode in score view.
        //     inReview = true
            
        // }
        // if(inReview){
            // if(data.answerKeys.length > 0){
            //     var selection = data.saveAns.find(s => s.questionId === data.questions[index])
            //     var answerKey = data.answerKeys.find(a => a.id === selection.selectionArray[0])
            //     correctAns = answerKey.correct
            // }
    //     }
    // }

    var savedAnsLabel = ''
    var classOfLabel = ''

    if(data.leftPanelList[index].savedAns !== ''){
        savedAnsLabel = ' - ' + data.leftPanelList[index].savedAns
    }
 
    switch(data.leftPanelList[index].status){
        case "unanswered":
            classOfLabel = 'unanswered-questions'
            break
        case "answered":
            classOfLabel = 'answered-questions'
            break
        case "correct":
            classOfLabel = 'correct-ans-idx'
            break
        case "incorrect":
            classOfLabel = 'incorrect-ans-idx'
            break
        case "flagged":
            classOfLabel = 'flagged-question'
    }

    return(
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={() => data.goTo(index)}>
                <div className={`${classOfLabel} ${parseInt(data.questionNumber)===index+1 ? 'current-question' : ''}`}>
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
    const leftPanelList = useSelector((state) => state.leftBarList)

    var saveAns

    if(mode === 'study'){
        saveAns = feedbacks
    }
    else{
        saveAns = selection
    }
    
    const location = useLocation()
    
    var history = useHistory()

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
                            leftPanelList: leftPanelList,
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
