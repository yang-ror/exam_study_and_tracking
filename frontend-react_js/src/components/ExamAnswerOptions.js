import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectionActionCreators, leftBarActionCreators } from "../state/index"
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel'

function RadioBtn({ options }){
    var elements = []
    var i = 0
    for(let option of options){
        elements.push(
            <div key={option.id} className="options flex-center-content-y">
                <FormControlLabel 
                    value={option.id} 
                    control={<Radio className= "radio-btn"/>} 
                    label={`${String.fromCharCode(i+65)}. ${option.text}`}
                />
            </div>
        )
        i++
    }
    return elements
}

function OptionGroup({ questionId, options, chooseMoreThanOne }){
    const selectionObjArray =  useSelector(state => state.selection)
    const selectionObj = selectionObjArray.find(selectionObj => selectionObj.questionId === questionId)

    const dispatch = useDispatch()
    const { saveAns } = bindActionCreators(selectionActionCreators, dispatch)
    const { updateList } = bindActionCreators(leftBarActionCreators, dispatch)

    var defaultValue = ''
    if(selectionObj.selectionArray.length > 0)
        defaultValue = selectionObj.selectionArray[0]
    
    const [value, setValue] = useState(defaultValue);

    const handleChange = event => {
        setValue(event.target.value)
        saveAns({
            questionId: questionId,
            selectedOption: [parseInt(event.target.value)]
        })
        updateList({
            questionId: questionId,
            savedAns: String.fromCharCode(parseInt(event.target.value) % 4 + 65),
            status: 'answered'
        })
    }

    useEffect(() => {
        function changeSelectionState(){
            setValue(defaultValue)
        }
        changeSelectionState()
    },[questionId])

    if(!chooseMoreThanOne){
        return <FormControl component="fieldset">
            <RadioGroup
                aria-label="answer"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                <RadioBtn options={options} />
            </RadioGroup>
        </FormControl>
    }
}

const ExamAnswerOptions = ({ optionObj }) => {
    return (
        <div className="options-holder">
            <OptionGroup questionId={optionObj.questionId} options={optionObj.options} chooseMoreThanOne={optionObj.chooseMoreThanOne} />
        </div>
    )
}

export default ExamAnswerOptions
