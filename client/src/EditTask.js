import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

const style = { // Style of modal
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles({
});

export default function EditTask({ editTask, id }) {
    const classes = useStyles();
    const [task, setTask] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        if (task !== "") {
            editTask(id, task)
        }
        setTask("")
        setOpen(false)
    };

    return (
        <div>
            <EditIcon onClick={handleOpen} className={classes.editIcon} />
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        onChange={(event) => { setTask(event.target.value); }}
                        label="Update Task"
                        variant="outlined"
                        value={task}
                    />
                    <Button onClick={handleClose} variant="contained">Create</Button>
                </Box>
            </Modal>
        </div>
    )
}
