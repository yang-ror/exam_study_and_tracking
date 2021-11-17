import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { getExams } from '../api/getRequests';

const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: 300,
        }
    }
}

const ExamSelector = ({ exams, setSelectedExam }) => {
    const [exam, setExam] = React.useState('')
    // const [exams, setExams] = React.useState('')

    var elements = []
    for(let exam of exams){
        elements.push(<MenuItem key={exam.id} value={exam.id}>{exam.exam_name}</MenuItem>)
    }

    const handleChange = (event) => {
        setExam(event.target.value)
        setSelectedExam(event.target.value)
    }
    return (
        <Box sx={{ minWidth: 550, maxWidth: 550, maxHeight:300 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Exam</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={exam}
                    label="Exam"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                >
                    {elements}
                </Select>
            </FormControl>
        </Box>
    )
}

export default ExamSelector
