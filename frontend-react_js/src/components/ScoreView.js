import * as React from 'react'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import DialogBox from './DialogBox'
import LeftPanel from './LeftPanel'
import './ScoreView.css'

function getProgress(score, outOf){
    var percentage =  score / outOf * 100
    return percentage === 100 ? percentage + '%' : percentage.toFixed(2) + '%'
}

function getTime(t){
    var tLabel
    var sec = t % 60
    tLabel = `${sec} seconds`

    var min = Math.floor(t / 60) % 60
    if(min > 0) tLabel = `${min}${min === 1 ? ' minute ' : ' minutes '}` + tLabel

    var hr = Math.floor(t / 3600)
    if(hr > 0) tLabel = `${hr}${hr === 1 ? ' hour ' : ' hours '}` + tLabel

    return tLabel
}

// function getTimeInFormat(time){
//     var sec = time % 60
//     var min = Math.floor(time / 60) % 60
//     var hr = Math.floor(time / 3600)

//     var second = sec < 10 ? '0' + sec : '' + sec
//     var minute = min < 10 ? '0' + min : '' + min
    
//     return hr + ':' + minute + ':' + second
// }

function ScoreBar({ record, thisScore }){
    const [showPercentage, setShowPercentage] = useState(false)
    return <div className={`bar ${thisScore ? 'this-score-bar' : ''}`}
        onMouseEnter={() => setShowPercentage(true)}
        onMouseLeave={() => setShowPercentage(false)}
    >
        {!thisScore && <label className="time-label">{record.date}</label>}
        {showPercentage && <label className="center-self">{getProgress(record.score, record.out_of)}</label>}
        {!thisScore && <label className="score-label ">{record.score + '/' + record.out_of}</label>}
        <div className="progress" style={{
            width: getProgress(record.score, record.out_of),
            borderRadius: `15px ${record.score / record.out_of > 0.99 ? '15px 15px' : '0 0'} 15px`
        }}></div>
    </div>
}

function History({ records }){
    var elements = []
    for(let record of records){
        elements.push(<ScoreBar record={record} thisScore={false} />)
    }
    return elements
}

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

    const history = useHistory()

    const { examNumber } = useParams()
    // const selection = useSelector((state) => state.selection)
    // const questions = useSelector((state) => state.question)

    // var selectionToSubmid = []
    // for(let s of selection){
    //     selectionToSubmid.push(s.selectionArray[0])
    // }

    // var submition = {
    //     examId: examNumber,
    //     selections: selectionToSubmid
    // }

    // const [score, setScore] = React.useState(0)
    // React.useEffect(() => {
    //     const getScore = async () => {
    //         const res = await fetch('/result/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(submition)
    //         })
    //         var json = await res.json()
    //         setScore(json)
    //     }
    //     getScore()
    // },[])

    const [records, setRecords] = React.useState([])
    React.useEffect(() => {
        const getRecords = async () => {
            const res = await fetch('/record/' + examNumber)
            var json = await res.json()
            var rec = json.reverse()
            setRecords(rec)
        }
        getRecords()
    },[])

    return (
        <div className="main-container">
            <DialogBox open={openDialogBox} handleClose={handleClose} handleConfirm={handleConfirm} />
            <div className="left-panel">
                <LeftPanel />
            </div>
            <div className="view-container center-self">
            {records.length > 0 ? <>
                <div className="score-holder flex-center-content-x">
                    <label>{records[0].score}/{records[0].out_of}</label>
                </div>
                <div className="time-holder flex-center-content-x">
                    <label>{getTime(records[0].time_used)}</label>
                </div>
                <div className="bar-holder">
                    <ScoreBar record={records[0]} thisScore={true} />
                </div>
                <div className="history-holder">
                    <History records={records.slice(1)} />
                </div>
                <div>
                
                </div>
            </>
                : <h1 className="center-self">No History</h1>}
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
