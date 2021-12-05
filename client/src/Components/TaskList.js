import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import EditTask from '../EditTask'
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    tasks: {
        backgroundColor: '#5c6bc0',
        color: 'white',
        width: '60vw',
        height: '4.5rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: '100px',
        paddingLeft: '2rem',
        marginTop: '1.4rem',
    },
    taskText: {
        paddingRight: '1rem',
        paddingLeft: '2rem',
    },
    editIcon: {
        paddingRight: '1rem',
        paddingLeft: '1rem',
    },
});

export default function TaskList({ editTask, deleteTask, updateCompleteStatus, list, searchTerm }) {
    const classes = useStyles();
    return (
        // Show tasks in reverse order (newest ones first)
        // Filter for a search term (if provided)
        list.slice(0).reverse().filter(temp => {
            if (temp.task.toLowerCase().includes(searchTerm.toLowerCase())) {
                return temp.task
            }
            return null
        }).map((val, key) => {
            return <div className={classes.tasks}>
                {val.completed
                    ? <CheckBoxIcon onClick={() => updateCompleteStatus(val.id, val.completed)} />
                    : <CheckBoxOutlineBlankIcon onClick={() => updateCompleteStatus(val.id, val.completed)} />
                }
                <Typography className={classes.taskText}>{val.task}</Typography>
                <div className={classes.editIcon}>
                    <EditTask editTask={editTask} id={val.id} />
                </div>
                <DeleteIcon onClick={() => deleteTask(val.id)} />
            </div>
        })
    )
}
