/* eslint-disable react/prop-types */ // Disable prop-types linting for this file

import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux
import { deleteTaskAsync, updateTaskAsync } from "../../../features/tasks/tasksSlice"; // Importing deleteTaskAsync and updateTaskAsync action creators
import { HiDotsVertical } from "react-icons/hi"; // Importing HiDotsVertical icon from react-icons/hi
import './TaskStatusCard.css'; // Importing CSS file for styling
import { MdDelete, MdEditSquare } from "react-icons/md"; // Importing MdDelete and MdEditSquare icons from react-icons/md
import { useState } from "react"; // Importing useState hook from React

// TaskStatusCard functional component
const TaskSatusCard = ({ task, taskStatus }) => {
    const [processOpen, setProcessOpen] = useState(false); // State to manage process open/close
    const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions

    // Function to get status color based on taskStatus
    const getStatusColor = (taskStatus) => {
        switch (taskStatus) {
            case 'Pending':
                return '#ffcc00'; // Yellow
            case 'In-progress':
                return '#3399ff'; // Blue
            case 'Completed':
                return '#00cc00'; // Green
            case 'Deployed':
                return '#800080'; // Purple
            case 'Deferred':
                return '#ff0000'; // Red
            default:
                return '#666666'; // Default color
        }
    };

    // Function to handle task deletion
    const handleDelete = (id) => {
        dispatch(deleteTaskAsync(id));
    };

    // Function to toggle process open/close
    const toggleProcess = () => {
        setProcessOpen(!processOpen);
    };

    // State variables and setter functions for task update form
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');

    // Function to handle task update
    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const updatedTaskData = {
                title: title || task.title,
                description: description || task.description,
                assignee: assignee || task.assignee,
                priority: priority || task.priority,
                status: status || task.status
            };
            await dispatch(updateTaskAsync({ taskId: task._id, updatedTaskData }));
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
        setIsOpen(false);
        setProcessOpen(!processOpen);
    };

    // Render TaskStatusCard component
    return (
        <div className="task-card">
            <div className="flex justify-between items-center">
                <span>{task.title}</span>
                <span className="font-bold" style={{ color: getStatusColor(taskStatus), textTransform: 'uppercase', padding: '0.5rem' }}>{task.priority}</span>
            </div>
            <hr />
            <p className="min-h-24 my-3 text-sm">{task.description}</p>
            <div className="flex justify-between">
                <span className="font-lg">{task.assignee}</span>
                <button onClick={toggleProcess} className="font-bold"><HiDotsVertical /></button>
            </div>
            <br />
            <div>
                <strong style={{ color: getStatusColor(taskStatus), textTransform: 'uppercase' }}>{task.status}</strong>
            </div>
            {/* Process open */}
            {processOpen && (
                <span className="flex justify-between my-2">
                    <button className="bg-green-500 px-2 text-white rounded-sm" onClick={() => setIsOpen(true)}><MdEditSquare /></button>
                    {task.status === "Completed" ? ('') : (
                        <button className="bg-red-500 px-2 text-white rounded-sm" onClick={() => handleDelete(task._id)}>
                            <MdDelete />
                        </button>
                    )}
                </span>
            )}
            {/* Task update form */}
            <div>
                {isOpen && (
                    <div className="modal">
                        <div className="modal-content w-1/3 mx-auto">
                            <h2 className="uppercase text-2xl">Edit Task</h2>
                            <form className="bg-slate-400 p-4" onSubmit={handleUpdateTask}>
                                <input
                                    type="text"
                                    defaultValue={task.title}
                                    className="border"
                                    disabled
                                />
                                <input
                                    type="text"
                                    defaultValue={task.description}
                                    disabled
                                    className="border"
                                />
                                <input
                                    type="text"
                                    defaultValue={task.assignee}
                                    disabled
                                    className="border"
                                />
                                {/* Editable section */}
                                <section className="flex justify-between">
                                    <div>
                                        <span>Priority:</span>
                                        <select
                                            value={priority}
                                            className="border w-auto"
                                            onChange={(e) => setPriority(e.target.value)}
                                        >
                                            <option value={task.priority}>{task.priority}</option>
                                            {[...new Set(["P0", "P1", "P2", "P3"].filter(opt => opt !== task.priority))].map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <span>Status:</span>
                                        <select
                                            value={status}
                                            className="border w-auto"
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value={task.status}>{task.status}</option>
                                            {[...new Set(["Pending", "In-progress", "Completed", "Deployed", "Deferred"].filter(opt => opt !== task.status))].map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                </section>
                                <div className="button-container">
                                    <button type="submit" className="submit-button">Submit</button>
                                    <button type="button" className="cancel-button" onClick={() => (setIsOpen(false), setStatus(''), setPriority(''), setProcessOpen(!processOpen))}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskSatusCard; // Export TaskSatusCard component
