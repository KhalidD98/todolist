import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import EditTask from '../EditTask'
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles({
    "@global": {
        "@keyframes fadeIn": {
            "0%": {
                opacity: 0,
                transform: "translateX(-5rem)"
            },
            "100%": {
                opacity: 1,
                transform: "translateX(0)"
            }
        }
    },
    tasks: {
        background: 'rgba( 257, 257, 656, 0.18 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.33 )',
        backdropFilter: 'blur( 7px )',
        webkitBackdropFilter: 'blur( 7px )',
        color: 'white',
        width: '60%',
        height: '4.5rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: '100px',
        paddingLeft: '4rem',
        paddingRight: '1rem',
        marginTop: '1rem',
        marginBottom: '0.8rem',
        flexShrink: '0',
        animation: 'fadeIn .4s ease-in-out',
    },
    taskText: {
        paddingRight: '1rem',
        paddingLeft: '2rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '200px',
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
            return <div className={classes.tasks} key={val.id}>
                {val.completed
                    ? <CheckBoxIcon sx={{ color: grey[300] }} onClick={() => updateCompleteStatus(val.id, val.completed)} />
                    : <CheckBoxOutlineBlankIcon onClick={() => updateCompleteStatus(val.id, val.completed)} />
                }
                {val.completed
                    ? <Typography style={{ textDecorationColor: '#C8C8C8', textDecoration: 'line-through', color: '#D3D3D3' }} className={classes.taskText}>{val.task}</Typography>
                    : <Typography className={classes.taskText}>{val.task}</Typography>
                }
                <div className={classes.editIcon}>
                    <EditTask editTask={editTask} id={val.id} />
                </div>
                <DeleteIcon onClick={() => deleteTask(val.id)} />
            </div>
        })
    )
}
