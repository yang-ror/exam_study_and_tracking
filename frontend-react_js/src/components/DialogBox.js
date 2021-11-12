import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'

const DialogBox = ({open, handleClose, handleConfirm}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="confirm-to-end"
            aria-describedby="confirm-to-end-or-cancel"
        >
            <DialogTitle id="confirm-to-end">
                {"End Exam?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-to-end-or-cancel">
                    Progress is not saved.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox
