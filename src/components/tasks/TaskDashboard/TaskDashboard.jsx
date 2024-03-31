import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector hooks from react-redux
import { fetchTasksAsync } from '../../../features/tasks/tasksSlice'; // Import fetchTasksAsync action creator
import DynamicTaskCard from '../DynamicStatusCard/DynamicTaskCard'; // Import DynamicTaskCard component
import './TaskDashboard.css'; // Import CSS file for styling
import AddTask from '../CreateTask/AddTask'; // Import AddTask component

// TaskDashboard functional component
const TaskDashboard = () => {
    const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions
    const allTasks = useSelector(state => state.tasks.tasks); // Retrieve tasks from Redux store using useSelector hook

    // Define state variables and setter functions for filters
    const [priority, setPriority] = useState('');
    const [assignee, setAssignee] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');

    useEffect(() => {
        // Fetch tasks when the component mounts
        dispatch(fetchTasksAsync());
    }, [dispatch]); // Dependency array ensures useEffect runs only once after initial render

    // Filter tasks based on priority, assignee, and date range
    const filteredTasks = allTasks.filter(task => {
        const lowercaseAssignee = assignee.toLowerCase(); // Convert assignee input value to lowercase

        // Apply filters based on priority, assignee, and date range
        if (priority !== '' && assignee === '') {
            return task.priority === priority;
        }
        if (priority === '' && assignee !== '') {
            return task.assignee.toLowerCase().includes(lowercaseAssignee);
        }
        if (priority !== '' && assignee !== '') {
            return task.priority === priority && task.assignee.toLowerCase().includes(lowercaseAssignee);
        }
        if (startDateFilter && endDateFilter) {
            const taskDueDate = new Date(task.dueDate);
            return taskDueDate >= new Date(startDateFilter) && taskDueDate <= new Date(endDateFilter);
        }
        return true; // Return true if no filters are applied
    });

    // Render TaskDashboard component
    return (
        <div className="max-w-7xl mx-auto">
            {/* Filter and AddTask components */}
            <div className='flex items-center my-6 flex-col-reverse lg:flex-row lg:justify-between lg:items-center'>
                {/* Filter section */}
                <div className='flex flex-col items-center lg:flex-row gap-4 lg:items-center'>
                    <span className='hidden lg:block'>Filter:</span>
                    <div className="flex flex-col items-center lg:flex-row lg:items-center lg:space-x-4">
                        {/* Assignee filter */}
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Assignee"
                                value={assignee}
                                onChange={(e) => setAssignee(e.target.value)}
                                className="custom-input"
                            />
                        </div>
                        {/* Priority filter */}
                        <div className="input-container">
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="custom-select"
                            >
                                <option value="">Priority</option>
                                <option value="P0">P0</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                                <option value="P3">P3</option>
                            </select>
                        </div>
                        {/* Start Date filter */}
                        <div className="input-container">
                            <input
                                type="date"
                                value={startDateFilter}
                                onChange={(e) => setStartDateFilter(e.target.value)}
                                className="custom-input"
                            />
                        </div>
                        {/* End Date filter */}
                        <div className="input-container">
                            <input
                                type="date"
                                value={endDateFilter}
                                onChange={(e) => setEndDateFilter(e.target.value)}
                                className="custom-input"
                            />
                        </div>
                    </div>
                </div>
                {/* AddTask component */}
                <AddTask />
            </div>

            {/* Short filter section */}
            <div className='lg:flex hidden gap-4 mb-4 items-center'>
                <span>Short:</span>
                <div className="input-container">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="custom-select"
                    >
                        <option value="">Priority</option>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                </div>
            </div>

            {/* Render DynamicTaskCard components for each status */}
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-4">
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "Pending")} status="Pending" />
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "In-progress")} status='In-progress' />
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "Completed")} status="Completed" />
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "Deployed")} status="Deployed" />
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "Deferred")} status="Deferred" />
            </div>
        </div>
    );
};

export default TaskDashboard; // Export TaskDashboard component
