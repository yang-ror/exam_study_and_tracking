import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { feedbackActionCreators } from "../state/index"
import { getAnswerKeys } from '../api/getRequests'
import { useParams } from "react-router-dom"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'

const style = {
    width: '100%',
    bgcolor: 'background.paper',
    borderRadius: 3
}

function OptionElement({questionId, optionId, letter, optionText, correct}){
    const feedbackObjArray = useSelector((state) => state.feedback)
    const feedbackObjByQuestionId = feedbackObjArray.find(feedbackObj => feedbackObj.questionId === questionId)
    const feedbackObj = feedbackObjByQuestionId.feedbackArray.find(feedbackObj => feedbackObj.optionId === optionId)
    const feedback = feedbackObj.feedback

    const [feedbackState, setFeedbackState] = useState(feedback);
    const dispatch = useDispatch()
    const { setFeedback } = bindActionCreators(feedbackActionCreators, dispatch)
    
    function setFeedbackStateAndStore(questionId, optionId){
        setFeedbackState(true)
        setFeedback({
            questionId: questionId,
            optionId: optionId
        },[])
    }

    useEffect(() => {
        function changeFeedbackState(){
            setFeedbackState(feedback)
        }
        changeFeedbackState()
    })

    return <ListItem className="options" button onClick={() => setFeedbackStateAndStore(questionId, optionId)}>
        <div><label className={`option-letter ${feedbackState ? correct ? 'correct-ans' : 'incorrect-ans' : ''}`}>{letter}.</label></div>
        <label className={`option-label ${feedbackState ? correct ? 'correct-ans' : 'incorrect-ans' : ''}`}>{optionText}</label>
    </ListItem>
}

function OptionElements({questionId, options , answerKeys}){
    var elements = []
    
    let i = 0;
    for(let option of options){
        elements.push(
            <OptionElement 
                questionId={questionId}
                optionId={option.optionId}
                key={option.optionId} 
                letter={String.fromCharCode(option.optionId+65)} 
                optionText={option.text} 
                correct={answerKeys.find(answerKey => answerKey.optionId === option.optionId).correct}
            />
        )
        if(i++ < options.length-1) 
            elements.push(<Divider key={option.optionId + options.length} />)
    }
    return elements
}

const StudyAnswerOptions = ({ optionObj }) => {
    const options = optionObj.options
    const { examNumber } = useParams()
    const answerKeys  = getAnswerKeys(parseInt(examNumber), optionObj.questionId)

    return(
        <div className="options-holder">
            <List sx={style} component="nav" aria-label="mailbox folders">
                <OptionElements 
                    questionId={optionObj.questionId} 
                    options={options} 
                    answerKeys={answerKeys} 
                />
            </List>
        </div>
    )
}

export default StudyAnswerOptions
