import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { indigo } from '@mui/material/colors';

const style = { // Style of modal
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    height: 230,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    boxShadow: ' 0 3px 7px rgba(0, 0, 0, 0.3)',
    p: 4,
};

const useStyles = makeStyles({
    addTaskButton: {
        cursor: 'pointer',
    },
    textField: {
        marginBottom: '1rem'
    }
});

export default function AddTask({ addTask }) {
    const classes = useStyles();
    const [task, setTask] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        if (task !== "") {
            addTask(task)
        }
        setTask("")
        setOpen(false)
    };


    return (
        <div>
            <AddCircleIcon className={classes.addTaskButton} onClick={handleOpen} sx={{ fontSize: '5rem', color: indigo[400] }} />
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        onChange={(event) => { setTask(event.target.value) }}
                        label="New Task"
                        variant="outlined"
                        value={task}
                        sx={{ marginBottom: '2rem' }}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                handleClose()
                            }
                        }}
                    />
                    <Button onClick={handleClose} variant="contained">Create</Button>
                </Box>
            </Modal>
        </div>
    )
}
