import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';

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
    editTaskButton: {
        cursor: 'pointer',
    }
});

export default function EditTask({ editTask, id, oldTask }) {
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
            <EditIcon className={classes.editTaskButton} onClick={handleOpen} />
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Input
                        sx={{ marginBottom: '2rem' }}
                        inputProps={{ maxLength: 30 }}
                        onChange={(event) => { setTask(event.target.value); }}
                        placeholder={oldTask}
                        variant="outlined"
                        value={task}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                handleClose()
                            }
                        }}
                    />
                    <Button onClick={handleClose} variant="contained">Update</Button>
                </Box>
            </Modal>
        </div>
    )
}
