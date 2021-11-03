import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'
import DialogBox from './DialogBox';
import LeftPanel from './LeftPanel'

const ScoreView = () => {
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
    let history = useHistory()

    function goToReview(){

        console.log("begin review")
    }

    return (
        <div className="main-container">
            <DialogBox open={openDialogBox} handleClose={handleClose} handleConfirm={handleConfirm} />
                <div className="left-panel">
                    <LeftPanel />
                </div>
            <div className="view-container center-self flex-center-content">
                <h1>3/3</h1>
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
