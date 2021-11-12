// import { useState, useEffect } from 'react';

// import { useSelector, useDispatch } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { selectionActionCreators } from "../state/index"

// import { styled } from '@mui/material/styles'
// import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup'
// import Radio from '@mui/material/Radio'

// import FormControlLabel from '@mui/material/FormControlLabel'

// import FormGroup from '@mui/material/FormGroup';
// import Checkbox from '@mui/material/Checkbox';

// const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
//     ({ theme, checked }) => ({
//         '.MuiFormControlLabel-label': checked && { color: theme.palette.primary.main },
//     }),
//     () => ({
//         '.MuiFormControlLabel-label': { paddingLeft: "1.7em" },
        
//     }),
//     () => ({
//         '.MuiFormControlLabel-label': { textIndent: "-1.3em" }
//     })
// )

// function RadioFormControlLabel(props) {
//     const radioGroup = useRadioGroup()
    
//     let checked = false;
  
//     if (radioGroup) {
//         checked = radioGroup.value === props.value;
//     }
  
//     return <StyledFormControlLabel checked={checked} {...props} />;
// }

// function StyledFormControlLabels({ optionObj }){
//     const options = optionObj.options
//     const questionId = optionObj.questionId
//     var elements = []
//     for(let [index, option] of options.entries()){
//         elements.push(
//             <div key={index} className="options flex-center-content-y">
//                 <RadioFormControlLabel 
//                     // questionId={questionId}
//                     value={String.fromCharCode(option.optionId+65)} 
//                     label={`${String.fromCharCode(option.optionId+65)}. ${option.text}`} 
//                     control={<Radio />} 
//                 />
//             </div>
//         )
//     }
//     return elements
// }

// function CheckBoxes({ optionObj }){
//     const options = optionObj.options
//     // const questionId = optionObj.questionId
//     var elements = []
//     for(let [index, option] of options.entries()){
//         elements.push(
//             <div key={index} className="options flex-center-content-y">
//                 <StyledFormControlLabel 
//                     value={option.optionId} 
//                     label={`${String.fromCharCode(option.optionId+65)}. ${option.text}`} 
//                     control={<Checkbox />} 
//                 />
//             </div>
//         )
//     }
//     return elements
// }

// function OptionGroup({ optionObj, chooseMoreThanOne }){
//     const questionId = optionObj.questionId

//     const selectionObjArray =  useSelector((state) => state.selection)
//     const selectionObj = selectionObjArray.find(selectionObj => selectionObj.questionId === questionId)

//     const dispatch = useDispatch()
//     const { saveAns } = bindActionCreators(selectionActionCreators, dispatch)
//     const handleChange = (event) => {
//         saveAns({
//             questionId: questionId,
//             selectedOption: [(event.target.value.charCodeAt(0)) - 65]
//         })
//         console.log(selectionObj.selectionArray[0])
//     };
    
//     if(chooseMoreThanOne){
//         return <FormGroup>
//             <CheckBoxes optionObj={optionObj} />
//         </FormGroup>
//     }
//     else{
//         return <RadioGroup 
//                 name="controlled-radio-buttons-group"
//                 defaultValue={String.fromCharCode(selectionObj.selectionArray[0]+65)}
//                 onChange={handleChange}
//             >
//             <StyledFormControlLabels optionObj={optionObj} />
//         </RadioGroup>
//     }
// }

// const ExamAnswerOptions = ({ optionObj, chooseMoreThanOne }) => {
//     return (
//         <div className="options-holder">
//             <OptionGroup optionObj={optionObj} chooseMoreThanOne={chooseMoreThanOne} />
//         </div>
//     )
// }

// export default ExamAnswerOptions
