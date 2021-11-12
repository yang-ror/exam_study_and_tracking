import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectionActionCreators } from "../state/index"

import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl';

import FormControlLabel from '@mui/material/FormControlLabel'


function RadioBtn({ options }){
    var elements = []
    for(let option of options){
        elements.push(
            <div key={option.optionId} className="options flex-center-content-y">
                <FormControlLabel 
                    value={option.optionId} 
                    control={<Radio className= "radio-btn"/>} 
                    label={`${String.fromCharCode(option.optionId+65)}. ${option.text}`} 
                />
            </div>
        )
    }
    return elements
}

function OptionGroup({ optionObj, chooseMoreThanOne }){
    const questionId = optionObj.questionId

    const selectionObjArray =  useSelector(state => state.selection)
    const selectionObj = selectionObjArray.find(selectionObj => selectionObj.questionId === questionId)

    const dispatch = useDispatch()
    const { saveAns } = bindActionCreators(selectionActionCreators, dispatch)

    var defaultValue = ''
    if(selectionObj.selectionArray.length > 0)
        defaultValue = selectionObj.selectionArray[0]
    
    const [value, setValue] = useState(defaultValue);

    const handleChange = event => {
        setValue(event.target.value);
        saveAns({
            questionId: questionId,
            selectedOption: [parseInt(event.target.value)]
        })
    }

    useEffect(() => {
        function changeSelectionState(){
            setValue(defaultValue)
        }
        changeSelectionState()
    })

    if(!chooseMoreThanOne){
        return <FormControl component="fieldset">
            <RadioGroup
                aria-label="answer"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                <RadioBtn options={optionObj.options} />
            </RadioGroup>
        </FormControl>
    }
}

const ExamAnswerOptions = ({ optionObj, chooseMoreThanOne }) => {
    return (
        <div className="options-holder">
            <OptionGroup optionObj={optionObj} chooseMoreThanOne={chooseMoreThanOne} />
        </div>
    )
}

export default ExamAnswerOptions
