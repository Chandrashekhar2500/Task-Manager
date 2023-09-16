import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { clearCookie, getCookie } from '../components/Cookie';
import { AuthService } from '../network/authService';
import './dashboard.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const TaskManager = () => {
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState([])
    const [newTask, setNewTask] = useState({uuid: getCookie('uuid'), name:'', description:'', status:''})
    const [editTask, setEditTask] = useState({uuid: getCookie('uuid'), id:'', name:'', description:'', status:''})

    const handleChange = e => {
        const { name, value } = e.target;
        setNewTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = e => {
        const { name, value } = e.target;
        setEditTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [open, setOpen] = useState(false);
    const [editOpen, setEdit] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = ()=>{
        clearCookie();
        navigate('/')
    }

    const TaskList = async()=>{
        try {
			await AuthService.taskList({uuid: getCookie('uuid')}).then(res => {
				if (res.code === 200) {
                    setTaskData(res.data)
				} else {
					toast.error(`${res.message}`, {
						duration: 2000
					});
				}
			});
		} catch (err) {
			toast.error('Sever Connection Failed', {
				duration: 2000
			});
		}
    }

    const addTask = async()=>{
        if(newTask.name !== '' && newTask.description !== '' && newTask.status !== ''){
            try {
                await AuthService.addTask(newTask).then(res => {
                    if (res.code === 200) {
                        taskData.push(newTask)
                        setTaskData(taskData)
                        handleClose();
                        toast.success(`${res.message}`, {
                            duration: 2000
                        });
                    } else {
                        toast.error(`${res.message}`, {
                            duration: 2000
                        });
                    }
                });
            } catch (err) {
                toast.error('Sever Connection Failed', {
                    duration: 2000
                });
            }
        } else {
            toast.error(`Fields are Required`, {
                duration: 2000
            });
        }

    }

    const deleteTask = async(index)=>{
        try {
			await AuthService.deleteTask({id:index, uuid:getCookie('uuid')}).then(res => {
				if (res.code === 200) {
                    const newArrayObj = taskData.filter(object => {
                        return object.id !== index;
                        });
                    setTaskData(newArrayObj)
                    toast.success(`${res.message}`, {
						duration: 2000
					});
				} else {
					toast.error(`${res.message}`, {
						duration: 2000
					});
				}
			});
		} catch (err) {
			toast.error('Sever Connection Failed', {
				duration: 2000
			});
		}
    }

    const updateTask = async()=>{
        if(editTask.name !== '' && editTask.description !== '' && editTask.status !== ''){
            try {
                await AuthService.updateTask(editTask).then(res => {
                    if (res.code === 200) {
                        [editTask].forEach(element => {
                            const itemIndex = taskData.findIndex(o => o.id === element.id);
                            if(itemIndex > -1) {
                                taskData[itemIndex] = element;
                            } else {
                                taskData = taskData.push(element);
                            }       
                        });
                        setTaskData(taskData)
                        setEdit(false)
                        toast.success(`${res.message}`, {
                            duration: 2000
                        });
                    } else {
                        toast.error(`${res.message}`, {
                            duration: 2000
                        });
                    }
                });
            } catch (err) {
                toast.error('Sever Connection Failed', {
                    duration: 2000
                });
            }
        } else {
            toast.error('Fields are Required', {
                duration: 2000
            });
        }

    }

    const openEdit=(item)=>{
        setEditTask(prevState => ({
            ...prevState,
            id: item.id,
            name: item.name, description: item.description, status: item.status
        }));
        setEdit(true)
    }

    useEffect(() => {
        TaskList();
    }, [])

    return (
        <>
            <Grid className='heading'>
            <h1 className='text-center'>Welcome to Dashboard</h1>
            <Button className='Logout' onClick={handleLogout}>Logout</Button>
            </Grid>
            {
                taskData.length > 0 ? (
                    <>
                    <h3 className='text-center mt-4 mb-4'>Task List <strong onClick={handleOpen} className='Addbutton'>Add Task</strong></h3>
                    <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskData.length > 0 && taskData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.status}</td>
                                <td><EditIcon onClick={()=>{openEdit(item)}} style={{cursor:'pointer', marginRight:'15px'}}/> <DeleteIcon onClick={()=>{deleteTask(item.id)}} style={{cursor:'pointer'}}/></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </>

                ) : (
                    <>
                        <Grid>
                            <h4 className='text-center mt-5'>No Task is there. <strong onClick={handleOpen} className='Addbutton'>Add Task</strong></h4>
                        </Grid>
                    </>
                )
            }
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style, width: 500 }} className='Modal'>
                    <TextField label="Task Name" variant="standard" className='Field'  onChange={handleChange} name="name" />
                    <TextField label="Task Description" variant="standard" className='Field' onChange={handleChange} name="description"/>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="status"
                        onChange={handleChange}
                        label="Status"
                        >
                        <MenuItem value='Assign'>Assign</MenuItem>
                        <MenuItem value='On-Progres'>On-Progres</MenuItem>
                        <MenuItem value='Completed'>Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <Box className='Buttons'>
                        <Button onClick={addTask} variant="outlined">Add</Button>
                        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={editOpen}
                onClose={()=>{setEdit(false)}}
            >
                <Box sx={{ ...style, width: 500 }} className='Modal'>
                    <TextField label="Task Name" variant="standard" className='Field' value={editTask.name} onChange={handleEdit} name="name" />
                    <TextField label="Task Description" variant="standard" className='Field' value={editTask.description} onChange={handleEdit} name="description"/>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="status"
                        onChange={handleEdit}
                        label="Status"
                        value={editTask.status}
                        >
                        <MenuItem value='Assign'>Assign</MenuItem>
                        <MenuItem value='On-Progres'>On-Progres</MenuItem>
                        <MenuItem value='Completed'>Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <Box className='Buttons'>
                        <Button onClick={updateTask} variant="outlined">Edit</Button>
                        <Button onClick={()=>{setEdit(false)}} variant="outlined" color="error">Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default TaskManager